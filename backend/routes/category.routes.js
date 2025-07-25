import express from 'express'
import {createNewCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory} from '../controllers/category.controller.js'
import upload from '../utils/multer.js';

const app = express();
const router = express.Router()


router.route('/categories/add').post(upload.single('image'), createNewCategory)
router.route('/categories').get(getAllCategories)
router.route('/category/:id').get(getCategoryById)
router.route('/category/update/:id').put(updateCategory)
router.route('/category/delete/:id').delete(deleteCategory)



export default router




