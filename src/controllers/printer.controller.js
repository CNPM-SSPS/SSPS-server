import mongoose from "mongoose";
import Printer from "../models/printer.model.js";

export const getPrinters = async (req, res) => {
    try {
        const printers = await Printer.find();
        res.status(200).json(printers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



