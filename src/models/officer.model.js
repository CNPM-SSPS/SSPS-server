import mongoose from 'mongoose';
import User from './user.model';

const officerSchema = mongoose.Schema({
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

const Officer = User.discriminator('Officer', officerSchema);

export default Officer;
