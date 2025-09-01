import {Cart} from '../models/cart.model.js'

export const addToCart = async (req, res)=>{
    try {
        const body = req.body;
        const cartItem = await Cart.create(body);
        res.status(201).json({
            success:true,
            cartItem
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error?.message || 'Could not add Item to the cart, Please try again'
        })        
    }
}

export const removeFromCart = async (req, res)=>{
    try {
        const {id} = req.params;
        const cartItem = await Cart.findByIdAndDelete(id);
         res.status(201).json({
            success:true,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error?.message || 'Could delete Item from the cart, Please try again'
        }) 
    }
}

export const clearCart = async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
}

export const updateCart = async (req, res)=>{
    try {
        const {id, type} = req.params;

        if(!id || !type) return;

        if(type==='INCREMENT'){
            
        }else if(type==='DECREMENT'){

        }else{
            return
        }

    } catch (error) {
        
    }
}

export const getAllCartItems = async (req, res)=>{
    try {
        const cartItems = await Cart.find({});
        res.status(200).json({
            success:true,
            cartItems
        })
    } catch (error) {
        res.json({
            success: false,
            message: error?.message || 'Could get Items from the cart, Please try again'
        })
    }
}

export const getSingleCartItem = async (req, res)=>{
    try {
        const {id} = req.params;
        const cartItem = await Cart.findById(id);
         res.status(201).json({
            success:true,
            cartItem
        })
    } catch (error) {
        res.json({
            success: false,
            message: error?.message || 'Could get Item from the cart, Please try again'
        })
    }
}

