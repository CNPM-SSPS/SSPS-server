import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';


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


const PrintingLogSchema = mongoose.Schema({
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


PrintingLogSchema.plugin(toJSON);

const PrintingLog = mongoose.model('PrintingLog', PrintingLogSchema);


export default PrintingLog;
