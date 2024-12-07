import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */

const PrintingLogSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  printer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Printer',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // array
  printingFile: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'uploadFile',
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'failure'],
    default: 'success'
  },
  color: {
    type: Boolean,
    default: false,
    required: true
  },
  //
  printType: {
    type: String,
    enum: ['single-sided', 'double-sided'],
    required: true
  },
  // total pages of files
  printCount: {
    type: Number,
    required: true
  },
  supportTicketID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'SupportTicket',
    default: null
  },
  totalCost: {
    type: Number,
    required: true
  }
});

PrintingLogSchema.plugin(toJSON);

const PrintingLog = mongoose.model('PrintingLog', PrintingLogSchema);

export default PrintingLog;
