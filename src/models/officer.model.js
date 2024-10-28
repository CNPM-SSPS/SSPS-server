import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import PrintingLog from './printingLog.model.js';
import SupportTicket from './supportTicket.model.js';
import User from './user.model.js';


const User = mongoose.model('User');

const officerSchema = User.discriminator('Officer',mongoose.Schema(
    {
        officerID: {
            type: String,
            required: true,
            unique: true
        },
        campus:{
            type: String,
            required: true
        },
        CCCD:{
            type: String,
            required: true
        }
    }
));

officerSchema .methods.viewLogs = async function(studentID, printerID) {
    const logs = await PrintingLog.find({studentID: studentID, printerID: printerID});
    return logs;
},

officerSchema .methods.responseSupportTicket = async function(SupportTicket, response) {
    SupportTicket.response = response;
    SupportTicket.responded = true;
    SupportTicket.timeResponded = Date.now();
    await SupportTicket.save();
    return SupportTicket;
}
officerSchema.methods.closeSupportTicket = async function(SupportTicket) {
    SupportTicket.response = "Ticket closed";
    SupportTicket.responded = true;
    SupportTicket.timeResponded = Date.now();
    await SupportTicket.save();
    return SupportTicket;
}

officerSchema.methods.transferSupportTicket = async function(SupportTicket) {
}


officerSchema.plugin(toJSON);

const Officer = mongoose.model('Officer', officerSchema);

export default Officer;