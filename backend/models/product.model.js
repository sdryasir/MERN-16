import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: String,
    slug:String,
    price: Number,
    description: String,
    category:String,
    image:String,
    rating:{
        rate:Number,
        count:Number
    }
});


export const Product = mongoose.model('Product', ProductSchema);