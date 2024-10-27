import mongoose from 'mongoose';

const printerSchema = mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  building: {
    type: String,
    required: true
  },
  campus: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  }
});

printerSchema.methods.getLocation = () => {
  // return `${this.room}, ${this.building}, ${this.campus}`;
};

const Printer = mongoose.model('Printer', printerSchema);

export default Printer;
