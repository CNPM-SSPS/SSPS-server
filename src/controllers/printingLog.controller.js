import mongoose from "mongoose";
import Printer from "../models/printer.model.js";
import Student from "../models/student.model.js";
import PrintingLog from "../models/printingLog.model.js";
import User from "../models/user.model.js";

export const getPrintingLogs = async (req, res) => {
    const { studentID, printerID } = req.query;
    try {
        const query = {};
        if (studentID) query.studentID = studentID;
        if (printerID) query.printerID = printerID;
        const logs = await PrintingLog.find(query).populate('file').populate('studentID').populate('printerID');
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createPrintingLogs = async (req, res) => {
    const { studentID, printerID, file } = req.body;
    try {
        const newPrintingLog = await PrintingLog.create({ studentID, printerID, file });
        res.status(201).json(newPrintingLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}