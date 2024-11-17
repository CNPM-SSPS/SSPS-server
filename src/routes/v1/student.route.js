import express from 'express';
import * as studentController from '../../controllers/student.controller.js';
import { auth } from '../../middlewares/auth.js';
import * as printerController from '../../controllers/printer.controller.js';
import * as printingLogController from '../../controllers/printingLog.controller.js';
import * as supportTicketController from '../../controllers/supportTicket.controller.js';
import * as uploadFileController from '../../controllers/uploadFile.controller.js';



const studentRouter = express.Router();

// Homepage
studentRouter.get('/homepage', studentController.getInfo);
// Account
studentRouter.put('/account/password', studentController.changePassword);
studentRouter.put('/account/profile', studentController.updateProfile);
studentRouter.get('/account/profile', studentController.getProfile);
studentRouter.get('/account/support', supportTicketController.getSupportTicketsByStudent); //done
studentRouter.post('/account/support', supportTicketController.createSupportTicketByStudent);//done
// Payment
studentRouter.get('/payment', studentController.getTransaction);
// Printing
studentRouter.get('/printing', uploadFileController.getUploadedFiles);//done
studentRouter.post('/printing', uploadFileController.uploadFileController);//done
studentRouter.post('/printing/print', printingLogController.createPrintingLogs);//done
studentRouter.get('/printing/print', printerController.getPrinters);//done
// Printing Log
studentRouter.get('/printinglog', printingLogController.getPrintingLogsByStudent);//done
studentRouter.get('/printinglog/:id', printingLogController.viewPrintingLog);//done






export default studentRouter;