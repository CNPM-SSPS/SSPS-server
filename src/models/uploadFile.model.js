import mongoose from 'mongoose';

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const uploadFileSchema = mongoose.Schema({
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
  printed: {
    type: Boolean,
    default: false
  },
  dateUploaded: {
    type: Date,
    default: Date.now
  }
});

const uploadFile = mongoose.model('uploadFile', uploadFileSchema);

export default uploadFile;
