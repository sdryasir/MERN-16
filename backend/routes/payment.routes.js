import express from 'express'
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { confirmOrder, stripePayment } from '../controllers/payment.controller.js';

const app = express();
const router = express.Router()


router.route('/checkout/sessions').post(stripePayment);
router.route('/order/confirm').post(confirmOrder);



export default router