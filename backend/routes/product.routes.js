import express from 'express'
import {createNewProduct, getAllProducts, getProductById, updateProduct, deleteProduct} from '../controllers/product.controller.js'

const app = express();
const router = express.Router()


router.route('/products/add').post(createNewProduct)
router.route('/products').get(getAllProducts)
router.route('/product/:name/:age/:qual').get(getProductById)
router.route('/product/update').put(updateProduct)
router.route('/product/delete').delete(deleteProduct)



export default router