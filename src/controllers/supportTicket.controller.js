import mongoose from "mongoose";
import SupportTicket from "../models/supportTicket.model.js";

export const createSupportTicket = async (req, res) => {
    const { student, printer, description } = req.body;
    try {
        const newSupportTicket = await SupportTicket.create({ student, printer, description });
        res.status(201).json(newSupportTicket);
    } catch (error) {
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

