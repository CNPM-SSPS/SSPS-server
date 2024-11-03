import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import PrintingLog from './printingLog.model.js';
import TransactionLog from './transactionLog.model.js';
import User from './user.model.js';

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
    paper: [
        {
            pageCount: {
                type: Number,
                required: true
            },
            pageType: {
                type: String,
                required: true
            }
        }
    ]
});

StudentSchema.methods.getHistory = async function() {
    const printingLogs = await PrintingLog.find({ studentID: this.studentID });
    return printingLogs;
};

StudentSchema.methods.getTransactions = function() {
    const tractions = TransactionLog.find({studentID: this.studentID});
    return tractions;
};

StudentSchema.methods.getInventories = function() {
    return this.paper;
};

StudentSchema.methods.addInventory = function(pageCount, pageType) {
    this.paper.push({pageCount: pageCount, pageType: pageType});
    this.save();
    return true;
}

StudentSchema.methods.useInventory = function(pageCount, pageType) {
    let found = false;
    for(let i = 0; i < this.paper.length; i++) {
        if(this.paper[i].pageType === pageType) {
            if(this.paper[i].pageCount >= pageCount) {
                this.paper[i].pageCount -= pageCount;
                found = true;
                this.save();
                break;
            }
        }
    }
    return found;
}

StudentSchema.plugin(toJSON);

const Student = User.discriminator('Student', StudentSchema);

export default Student;