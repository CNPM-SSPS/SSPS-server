import mongoose from "mongoose";
import Printer from "../models/printer.model.js";
import Student from "../models/student.model.js";
import PrintingLog from "../models/printingLog.model.js";
import User from "../models/user.model.js";
import uploadFile from "../models/uploadFile.model.js";

export const getPrintingLogsByStudent = async (req, res) => {
    const {printerID , printerBuilding, printerModel , startDate , endDate } = req.query;
    const userID = req.user._id;
    try {
        const query = {};
        query.user = userID;
        if (printerID) query.printer = printerID;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
            query.date = { $gte: start, $lte: end };
        }  
        const printersFilter = {};
        if (printerBuilding) printersFilter.building = printerBuilding; 
        if (printerModel) printersFilter.model = printerModel;
        const printers = await Printer.find(printersFilter);
        query.printer = { $in: printers.map(printer => printer._id) };
        const logs = await PrintingLog.find(query).populate('printingFile').populate('user').populate('printer');
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createPrintingLogs = async (req, res) => {
    const { printer , printingFile , color , printType , printCount , totalCost} = req.body;
    const user = req.user._id;
    try {
        await uploadFile.findByIdAndUpdate(printingFile, {printed: true});
        const newPrintingLog = await PrintingLog.create({ user, printer, printingFile, color, printType, printCount , totalCost});
        res.status(201).json(newPrintingLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPrintingLogByOfficer = async (req, res) => {
    const {status , printer , startTime , endTime , errorID} = req.query;
    const start = new Date(startTime);
    const end = new Date(endTime);
    try {
        const logs = await PrintingLog.find({ 
            status , 
            printer , 
            createdAt: { $gte: start, $lte: end }, 
            printingErrorID: errorID }).populate('user').populate('printer');
        res.json(logs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const viewPrintingLog = async (req, res) => {
    const {printingLogID} = req.params;
    try {
        const log = await PrintingLog.findById(printingLogID).populate('user').populate('printer').populate('printingFile');
        res.json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

    

