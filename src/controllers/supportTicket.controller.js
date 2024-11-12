import mongoose from "mongoose";
import SupportTicket from "../models/supportTicket.model.js";

export const createSupportTicketByStudent = async (req, res) => {
    const {description , printinglog} = req.body;
    const student = req.user._id;
    try {
        const newSupportTicket = await SupportTicket.create({ student, printinglog, description });
        res.status(201).json(newSupportTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateSupportTicketByOfficer = async (req, res) => {
    const { supportTicketID } = req.params;
    const { response } = req.body;
    //const officer = req.user._id;
    try {
        const updatedSupportTicket = await SupportTicket
        .findByIdAndUpdate(supportTicketID, { response, status : 'closed', closedAt: new Date() }, { new: true });
        res.status(200).json(updatedSupportTicket);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getSupportTickets = async (req, res) => {
    const { studentID, printerID } = req.query;
    try {
        const query = {};
        if (studentID) query.student = studentID;
        if (printerID) query.printer = printerID;
        const supportTickets = await SupportTicket.find(query).populate('student').populate('printer').populate('officer');
        res.status(200).json(supportTickets);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

