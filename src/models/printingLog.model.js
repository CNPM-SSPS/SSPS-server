import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import PrintingFile from './printingFile.model.js';
import { ref } from 'joi';

const PrintingLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    file: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrintingFile'
    }],
    studentID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    printerID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Printer',
        required: true
    }
});

PrintingLogSchema.plugin(toJSON);

const PrintingLog = mongoose.model('PrintingLog', PrintingLogSchema);

export default PrintingLog;