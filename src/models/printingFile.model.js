import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

const PrintingFileSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileType: {
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
    pageSize: {
        type: String,
        required: true
    },
    pageMaterial: {
        type: String,
        required: true
    }
});

const PrintingFile = mongoose.model('PrintingFile', PrintingFileSchema);

export default PrintingFile;
