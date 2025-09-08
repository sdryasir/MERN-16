import express from 'express'
import { addToCart, getAllCartItemsByUser, getSingleCartItem, removeFromCart, incrementCartQty, decrementCartQty, clearCart } from '../controllers/cart.controller.js';

const app = express();
const router = express.Router()

router.route('/cart/add/:userId').post(addToCart)
router.route('/cart-items/:userId').get(getAllCartItemsByUser)
router.route('/cart/:id').get(getSingleCartItem)
router.route('/cart/increment/:userId').post(incrementCartQty)
router.route('/cart/decrement/:userId').post(decrementCartQty)
router.route('/cart/clear/:userId').delete(clearCart)
router.route('/cart/delete/:productId/:userId').delete(removeFromCart)



export default router




