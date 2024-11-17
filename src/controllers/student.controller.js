import mongoose from "mongoose";
import Student from "../models/student.model.js";

export const getInfo = async (req, res) => {
    const student = await Student.findOne({ user: req.user._id });
    res.status(200).json(student);
}

export const changePassword = async (req, res) => {
    
}   

export const updateProfile = async (req, res) => {
    const info = req.body;
    try {
        const student = await Student.findOneAndUpdate({ user: req.user._id }, info, { new: true });
    } catch (error) {   
        res.status(400).json({ message: error.message });
    }
    res.status(200).json(student);
}

export const getProfile = async (req, res) => {
    
}

export const getSupportTicket = async (req, res) => {
    
}

export const createSupportTicket = async (req, res) => {
    
}

export const getTransaction = async (req, res) => {
    
}

export const getUploadFiles = async (req, res) => {
    
}

export const uploadFiles = async (req, res) => {
    
}

export const printFiles = async (req, res) => {
    
}

export const getPrinters = async (req, res) => {
    
}

export const getPrintingLog = async (req, res) => {
    
}

export const getPrintingLogById = async (req, res) => {
    
}



