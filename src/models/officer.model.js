import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import PrintingLog from './printingLog.model.js';
import SupportTicket from './supportTicket.model.js';
import User from './user.model.js';

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const officerSchema = new mongoose.Schema({
  officerID: {
    type: String,
    required: true,
    unique: true
  },
  campus: {
    type: String,
    required: true
  },
  CCCD: {
    type: String,
    required: true
  }
});

/**
 * @type {mongoose.Model<mongoose.Document>}
 */
const Officer = User.discriminator('Officer', officerSchema);

export default Officer;
