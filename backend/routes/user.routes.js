import express from 'express'
import { signupUser, signinUser, getMe, logout } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';


const app = express();
const router = express.Router()


router.route('/users/signup').post(signupUser);
router.route('/users/signin').post(signinUser);
router.route('/users/me').get(isAuthenticated, getMe);
router.route('/users/logout').post(logout);



export default router




