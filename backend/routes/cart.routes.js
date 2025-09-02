import express from 'express'
import { addToCart, getAllCartItemsByUser, getSingleCartItem, removeFromCart, updateCart } from '../controllers/cart.controller.js';

const app = express();
const router = express.Router()

router.route('/cart/add/:userId').post(addToCart)
router.route('/cart-items/:userId').get(getAllCartItemsByUser)
router.route('/cart/:id').get(getSingleCartItem)
router.route('/cart/update/:id/:type').put(updateCart)
router.route('/cart/delete/:id').delete(removeFromCart)



export default router




