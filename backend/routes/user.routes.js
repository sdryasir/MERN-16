import express from 'express'
import { signupUser, signinUser } from '../controllers/user.controller.js';

const app = express();
const router = express.Router()


router.route('/users/signup').post(signupUser);
router.route('/users/signin').post(signinUser);



export default router




