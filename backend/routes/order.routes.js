import express from 'express'
import { isAuthenticated, isAuthorized } from '../middleware/auth.middleware.js';
import { deleteOrderById, getAllOrders, getOrderById, updateOrderById } from '../controllers/order.controller.js';
const app = express();
const router = express.Router()


router.route('/orders').get(getAllOrders)
router.route('/orders/:id').get(getOrderById)
router.route('/orders/update/:id').put(updateOrderById)
router.route('/orders/delete/:id').delete(deleteOrderById)



export default router




