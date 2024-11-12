import express from 'express';
import * as uploadFileController from '../../controllers/uploadFile.controller.js';
import auth from '../../middlewares/auth.js';


const uploadFileRouter = express.Router();

uploadFileRouter.post('/upload', auth() ,uploadFileController.uploadFileController);
uploadFileRouter.get('/upload',auth(), uploadFileController.getUploadedFiles);




export default uploadFileRouter;