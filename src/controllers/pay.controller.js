import { vnpayService } from '../services/index.js';
import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';

const A4PRICE = 250; // 250 VND per A4 paper

export const purchasePaper = async (req, res, next) => {
  const amount = req.query.amount || 0;
  const money = parseInt(amount, 10) * A4PRICE;
  const transID = uuidv4();
  const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';
  try {
    const vnpayURL = await vnpayService.createPaymentURL(
      money,
      `${req.user.name} THANH TOAN ${amount} TO GIAY A4 SU DUNG SPSS`,
      transID,
      ipAddr
    );

    // log transaction to DB
    await vnpayService.logTransaction({
      studentID: req.user.id,
      transactionID: transID,
      pageCount: parseInt(amount, 10),
      money: money,
      completed: false,
      ipAddr: ipAddr
    });

    return res.status(httpStatus.OK).json({
      status: 'Success',
      message: 'Redirect to the following URL to proceed payment',
      url: vnpayURL
    });
  } catch (err) {
    next(err);
  }
};

export const verifyIPN = async (req, res) => {
  const ipnReturn = req.query;
  const resJSON = await vnpayService.verifyIPN(ipnReturn);
  if (resJSON.RspCode == 0) return res.status(httpStatus.OK).json(resJSON);
  res.json(resJSON);
};
