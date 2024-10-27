import mongoose from 'mongoose';
import User from './user.model';

const studentSchema = mongoose.Schema({
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
    default: 0
  }
});

const Student = User.discriminator('Student', studentSchema);

export default Student;
