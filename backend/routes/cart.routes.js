import express from 'express'
import { addToCart, getAllCartItems, getSingleCartItem, removeFromCart, updateCart } from '../controllers/cart.controller.js';

const app = express();
const router = express.Router()

router.route('/cart/add').post(addToCart)
router.route('/cart-items').get(getAllCartItems)
router.route('/cart/:id').get(getSingleCartItem)
router.route('/cart/update/:id/:type').put(updateCart)
router.route('/cart/delete/:id').delete(removeFromCart)



export default router




