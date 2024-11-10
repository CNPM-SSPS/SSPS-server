import {
  ProductCode,
  VnpLocale,
  dateFormat,
  InpOrderAlreadyConfirmed as IpnOrderAlreadyConfirmed,
  IpnFailChecksum,
  IpnInvalidAmount,
  IpnOrderNotFound,
  IpnSuccess,
  IpnUnknownError
} from 'vnpay';
import vnpayConfig from '../config/vnpay.js';
import config from '../config/config.js';
import { TransactionLog } from '../models/index.js';

const paymentExpireDate = () => {
  const PAYMENT_EXPIRE_TIME = 30 * 60 * 1000; // 30 minutes
  const expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + PAYMENT_EXPIRE_TIME);
  return expireDate;
};

export const createPaymentURL = async (amount, orderInfo, transID, ipAddr = '127.0.01') => {
  return vnpayConfig.buildPaymentUrl({
    vnp_Amount: amount,
    vnp_IpAddr: ipAddr,
    vnp_TxnRef: transID,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: ProductCode.Pay,
    vnp_ReturnUrl: `http://${config.hostName}:${config.port}/v1/pay/redirect-return`,
    vnp_Locale: VnpLocale.VN,
    vnp_ExpireDate: dateFormat(paymentExpireDate())
  });
};

export const logTransaction = async (order) => {
  return await new TransactionLog(order).save();
};

// Verify and return status to VNPAY then log to db
export const verifyIPN = async (ipn) => {
  try {
    const verify = await vnpayConfig.verifyIpnCall(ipn);
    if (!verify.isVerified) {
      return IpnFailChecksum;
    }

    //find order / transaction Log
    const order = await TransactionLog.findOne({
      transactionID: verify.vnp_TxnRef
    });

    if (!order) {
      return IpnOrderNotFound;
    }

    if (verify.vnp_Amount !== order.money) {
      return IpnInvalidAmount;
    }

    if (order.completed === true) {
      return IpnOrderAlreadyConfirmed;
    }

    // update the order status
    order.completed = true;
    await order.save();

    return IpnSuccess;
  } catch (err) {
    console.error(err.stack);
    return IpnUnknownError;
  }
};

// Verify and return status to client
export const verifyReturnURL = async () => {};

// Refund is restricted in sandbox mode of VNpay, not yet implemented

export default { verifyIPN, verifyReturnURL, createPaymentURL, logTransaction };
