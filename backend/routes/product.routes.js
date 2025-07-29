import express from 'express'
import {createNewProduct, getAllProducts, getProductById, updateProduct, deleteProduct} from '../controllers/product.controller.js'
import upload from '../utils/multer.js';

const app = express();
const router = express.Router()


router.route('/products/add').post(upload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'galleryImages', maxCount: 5 }, // or whatever max you prefer
    ]), createNewProduct)
router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getProductById)
router.route('/product/update/:id').put(updateProduct)
router.route('/product/delete/:id').delete(deleteProduct)



export default router




