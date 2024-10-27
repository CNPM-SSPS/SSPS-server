import mongoose from 'mongoose';

const printingFileSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  pageSize: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  pageColor: {
    type: String,
    required: true
  },
  pageMaterial: {
    type: String,
    required: true
  }
  // Soft, hard, ...
});

const printingLogSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  printer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Printer'
  },
  date: {
    type: Date,
    default: Date.now
  },
  file: {
    type: [printingFileSchema],
    required: true
  }
});

const PrintingLog = mongoose.model('PrintingLog', printingLogSchema);

export default PrintingLog;
