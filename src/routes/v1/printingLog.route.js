import express from 'express';
import * as printingLogController from '../../controllers/printingLog.controller.js';
import auth from '../../middlewares/auth.js';

const printingLogRoutes = express.Router();

printingLogRoutes.post('/create', auth(), printingLogController.createPrintingLogs);
printingLogRoutes.get('/get', auth(), printingLogController.getPrintingLogs);


export default printingLogRoutes;