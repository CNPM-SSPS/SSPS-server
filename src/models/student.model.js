import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import User from './user.model.js';

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const StudentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  }
});

StudentSchema.plugin(toJSON);

/**
 * @type {mongoose.Model<mongoose.Document>}
 */
const Student = User.discriminator('Student', StudentSchema);

export default Student;
