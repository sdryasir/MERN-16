import User from '../models/user.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res)=>{
   
   const data = req.body;
   const hashedPassword = await bcrypt.hash(data.password, 10);
   data.password = hashedPassword;
    await User.create(data);
    
    res.json({
        message:'Category has been saved',
    });
}

export const signinUser = async (req, res)=>{
   
   const {email, password} = req.body;

   const user = await User.findOne({email});

   
   if(!user || user.length === 0){
    return res.status(404).json({
        success:false,
        message: 'User not found',
    })
   }


   const isMatched = await bcrypt.compare(password, user.password);

   if(!isMatched){
    return res.status(401).json({
        success:false,
        message: 'Invalid password',
    })
   }


   //Sign a JWT Token
   const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1h' });

   res.cookie("jwt-token", token, {
    httpOnly: true,
    maxAge: 3600000, // 60 minutes
    secure: false,
    sameSite: "lax"
   });

   res.json({
        message:'User has been logged in',
    });
}