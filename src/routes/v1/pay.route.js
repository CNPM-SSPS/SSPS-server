import express from 'express';
import { purchasePaper, verifyIPN } from '../../controllers/pay.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

router.get('/purchase', auth(), purchasePaper);
router.get('/ipn', verifyIPN);

export default router;
