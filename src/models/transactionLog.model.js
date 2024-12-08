import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const transactionLogSchema = mongoose.Schema({
  studentID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  transactionID: {
    type: String,
    unique: true,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  money: {
    type: Number,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  completed: {
    type: Boolean,
    index: true,
    required: true
  },
  ipAddr: {
    type: String,
    default: '127.0.0.1'
  }
});

transactionLogSchema.plugin(toJSON);

const TransactionLog = mongoose.model('TransactionLog', transactionLogSchema);

export default TransactionLog;
