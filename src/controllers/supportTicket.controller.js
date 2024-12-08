import mongoose from 'mongoose';
import SupportTicket from '../models/supportTicket.model.js';
import PrintingLog from '../models/printingLog.model.js';

export const createSupportTicketByStudent = async (req, res) => {
  const { description, printinglog } = req.body;
  const student = req.user._id;
  try {
    const newSupportTicket = await new SupportTicket({ student, printinglog, description }).save();
    const printingLog = await PrintingLog.findByIdAndUpdate(printinglog, {
      supportTicketID: newSupportTicket._id
    });
    res.status(201).json(newSupportTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSupportTicketByOfficer = async (req, res) => {
  const { supportTicketID } = req.params;
  const { response } = req.body;
  const officer = req.user._id;
  try {
    const updatedSupportTicket = await SupportTicket.findByIdAndUpdate(
      supportTicketID,
      { response, status: 'closed', closedAt: new Date(), officer: officer },
      { new: true }
    );
    res.status(200).json(updatedSupportTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSupportTicketsByStudent = async (req, res) => {
  const student = req.user._id;
  try {
    const supportTickets = await SupportTicket.find({ student })
      .populate('student')
      .populate('printer')
      .populate('officer');
    res.status(200).json(supportTickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSupportTicketsByOfficer = async (req, res) => {
  const { status, printer } = req.query;
  try {
    const supportTickets = await SupportTicket.find({
      ...(status && { status }),
      ...(printer && { printer })
    })
      .populate('student')
      .populate('printer')
      .populate('officer');
    res.status(200).json(supportTickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const viewSupportTicket = async (req, res) => {
  const { supportTicketID } = req.params;
  try {
    const supportTicket = await SupportTicket.findById(supportTicketID)
      .populate('student')
      .populate('printer')
      .populate('officer');
    res.status(200).json(supportTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
