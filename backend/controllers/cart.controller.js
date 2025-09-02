import Cart from '../models/cart.model.js'

export const addToCart = async (req, res)=>{
    try {
        const {userId} = req.params;
        const body = req.body;
        console.log("++++++++++++", {
            userId,
            body
        });

        const product = {
            productId:body._id,
            name:body.title,
            price:body.price,
            quantity:1
        }

        const cartItems = await Cart.find({userId});


        const newCartArr = cartItems.push(product);

        console.log("newCartArr", newCartArr);
        

        
        // const cartItem = await Cart.create(body);
        res.status(201).json({
            success:true,
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

export const getAllCartItemsByUser = async (req, res)=>{
    try {
        const {userId} = req.params;
        const cartItems = await Cart.find({userId});
        res.status(200).json({
            success:true,
            data:cartItems
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









// // routes/cart.routes.js
// import express from "express";
// import Cart from "../models/cart.model.js";

// const router = express.Router();

// /**
//  * Utility: findOrCreate cart for a user
//  */
// const getUserCart = async (userId) => {
//   let cart = await Cart.findOne({ userId });
//   if (!cart) {
//     cart = await Cart.create({ userId, items: [] });
//   }
//   return cart;
// };

// /**
//  * GET /cart/:userId
//  * → Get current user cart
//  */
// router.get("/:userId", async (req, res) => {
//   try {
//     const cart = await getUserCart(req.params.userId);
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * POST /cart/add/:userId
//  * → Add item OR increase quantity
//  */
// router.post("/add/:userId", async (req, res) => {
//   const { productId, name, price } = req.body;
//   try {
//     const cart = await getUserCart(req.params.userId);

//     const item = cart.items.find(i => i.productId.toString() === productId);

//     if (item) {
//       item.quantity += 1;
//     } else {
//       cart.items.push({ productId, name, price, quantity: 1 });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * POST /cart/remove/:userId
//  * → Remove item completely
//  */
// router.post("/remove/:userId", async (req, res) => {
//   const { productId } = req.body;
//   try {
//     const cart = await getUserCart(req.params.userId);
//     cart.items = cart.items.filter(i => i.productId.toString() !== productId);

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * POST /cart/increment/:userId
//  * → Increase quantity by 1
//  */
// router.post("/increment/:userId", async (req, res) => {
//   const { productId } = req.body;
//   try {
//     const cart = await getUserCart(req.params.userId);
//     const item = cart.items.find(i => i.productId.toString() === productId);

//     if (item) {
//       item.quantity += 1;
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * POST /cart/decrement/:userId
//  * → Decrease quantity by 1 (min = 1)
//  */
// router.post("/decrement/:userId", async (req, res) => {
//   const { productId } = req.body;
//   try {
//     const cart = await getUserCart(req.params.userId);
//     const item = cart.items.find(i => i.productId.toString() === productId);

//     if (item && item.quantity > 1) {
//       item.quantity -= 1;
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * DELETE /cart/clear/:userId
//  * → Remove all items
//  */
// router.delete("/clear/:userId", async (req, res) => {
//   try {
//     const cart = await getUserCart(req.params.userId);
//     cart.items = [];
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;






// import React, { createContext, useContext, useReducer, useEffect } from "react";
// import axios from "axios";

// // --- Reducer ---
// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_CART":
//       return action.payload; // overwrite with DB cart
//     case "ADD_TO_CART":
//       return state.some(item => item.productId === action.payload.productId)
//         ? state.map(item =>
//             item.productId === action.payload.productId
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         : [...state, { ...action.payload, quantity: 1 }];
//     case "REMOVE_FROM_CART":
//       return state.filter(item => item.productId !== action.payload);
//     case "CLEAR_CART":
//       return [];
//     case "INCREMENT_CART":
//       return state.map(item =>
//         item.productId === action.payload
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     case "DECREMENT_CART":
//       return state.map(item =>
//         item.productId === action.payload && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       );
//     default:
//       return state;
//   }
// };

// // --- Context ---
// const CartContext = createContext();

// function CartProvider({ children }) {
//   const [cartState, dispatch] = useReducer(cartReducer, []);
//   const userId = "12345"; // replace with auth context/session

//   // --- API Calls ---
//   const fetchCart = async () => {
//     try {
//       const { data } = await axios.get(`/api/cart/${userId}`);
//       dispatch({ type: "SET_CART", payload: data.items || [] });
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   const addToCart = async (product) => {
//     dispatch({ type: "ADD_TO_CART", payload: product });
//     await axios.post(`/api/cart/add/${userId}`, product);
//   };

//   const removeFromCart = async (productId) => {
//     dispatch({ type: "REMOVE_FROM_CART", payload: productId });
//     await axios.post(`/api/cart/remove/${userId}`, { productId });
//   };

//   const clearCart = async () => {
//     dispatch({ type: "CLEAR_CART" });
//     await axios.delete(`/api/cart/clear/${userId}`);
//   };

//   const incrementCart = async (productId) => {
//     dispatch({ type: "INCREMENT_CART", payload: productId });
//     await axios.post(`/api/cart/increment/${userId}`, { productId });
//   };

//   const decrementCart = async (productId) => {
//     dispatch({ type: "DECREMENT_CART", payload: productId });
//     await axios.post(`/api/cart/decrement/${userId}`, { productId });
//   };

//   // --- Load cart on first render ---
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cartState,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         incrementCart,
//         decrementCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;
// export const useCart = () => useContext(CartContext);

