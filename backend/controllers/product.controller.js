import {Product} from '../models/product.model.js'
export const createNewProduct = async (req, res)=>{
    const data = req.body;

    await Product.create(data)
    
    res.json({
        message:'Create Products endpoint called',
        data:data
    });
}
export const getAllProducts = async (req, res)=>{
    // const qData = req.query;
    const products = await Product.find({})
    res.json({
        message:'Products endpoint called',
        products
    });
}
export const getProductById = (req, res)=>{
    const pData = req.params;
    
    
    res.json({
        message:'Single product endpoint called',
        pData
    });
}
export const updateProduct = (req, res)=>{
    res.json({message:'Update product endpoint called'});
}
export const deleteProduct = (req, res)=>{
    res.json({message:'delete product endpoint called'});
}