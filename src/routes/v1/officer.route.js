import express from 'express';
import * as officerController from '../../controllers/officer.controller.js';
import * as supportTicketController from '../../controllers/supportTicket.controller.js';
import * as printerController from '../../controllers/printer.controller.js';
import * as printingLogController from '../../controllers/printingLog.controller.js';

const officerRouter = express.Router();

// Manage printers
officerRouter.get('/printer', printerController.getPrinters);
officerRouter.post('/printer', printerController.createPrinter);
officerRouter.put('/printer/:id', printerController.updatePrinter);
officerRouter.delete('/printer/:id', printerController.deletePrinter);
// Manage students

// Manage support tickets
officerRouter.get('/support', supportTicketController.getSupportTicketsByOfficer);
officerRouter.post('/support/:id', supportTicketController.updateSupportTicketByOfficer);
// Manage printing logs
officerRouter.get('/printinglog', printingLogController.getPrintingLogByOfficer);
officerRouter.get('/printinglog/:id', printingLogController.viewPrintingLog);




export default officerRouter;