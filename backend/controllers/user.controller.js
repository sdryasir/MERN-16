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

export const updateUser = async (req, res)=>{
   
   const data = req.body;
   const {id} = req.params;

   try {
    const userObj = {
    phone:data.mobile,
    address:{
        street: data.address1,
        city: data.city,
        state: data.province,
        country: data.country,
        postalCode: data.zip
    }
   }

   const updated = await User.findByIdAndUpdate(id, userObj);

    res.json({
        message:'Users has been Updated',
        user:updated,
        success:true
    });
   } catch (error) {
    res.json({
        message: error?.message || 'Something went wrong',
        success:false
    });
   }

   
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
   const token = jwt.sign({
    id:user._id,
    email:user.email,
    name:user.fullname,
    role:user.role
   }, process.env.JWT_SECRET, { expiresIn: '1h' });

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


export const getMe = async (req, res, next)=>{
    const user = await User.findById(req.user.id).select("-password");  
    res.status(200).json(user)
}

export const logout = async (req, res, next) => {
  res.cookie("jwt-token", "", {
    httpOnly: true,
    maxAge: 0,
    secure: false, // set to true in production
    sameSite: "lax",
  });

  res.json({ message: "User has been logged out" });
};