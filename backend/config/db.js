import mongoose from 'mongoose'

export const connectDB = async ()=>{
    const url = process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/e-commerce';
    
    await mongoose.connect(url);
}