import express from 'express';
import * as printerController from '../../controllers/printer.controller.js';


const printerRouter = express.Router();


printerRouter.get('/getPrinters', printerController.getPrinters);

printerRouter.put('/getPrinters/:id', printerController.updatePrinter);

printerRouter.delete('/getPrinters/:id', printerController.deletePrinter);

printerRouter.post('/addPrinter', printerController.createPrinter);

printerRouter.post('/SPSO',printerController.generatePrinters);

export default printerRouter;