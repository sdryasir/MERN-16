import mongoose from 'mongoose'

export const connectDB = async ()=>{
    const url = process.env.MONGO_DB_URI
    await mongoose.connect(url);
}