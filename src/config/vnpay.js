import { ignoreLogger, VNPay } from 'vnpay';
import config from './config.js';

const vnpayConfig = new VNPay({
  tmnCode: config.vnpay.tmn,
  secureSecret: config.vnpay.hashSecret,
  vnpayHost: 'https://sandbox.vnpayment.vn',
  testMode: true,
  hashAlgorithm: config.vnpay.hashAlgo,
  enableLog: true,
  loggerFn: ignoreLogger
});

export default vnpayConfig;
