import React, {createContext, useContext, useState, useReducer} from 'react'
import { useEffect } from 'react';
import {useAuth} from './AuthProvider'

const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case 'ADD_TO_CART': {

      const existingItem = state.find(item => item.productId == action.payload.productId);

      if (existingItem) {
        // Item exists → increment quantity
        return state.map(item =>
          item.productId == action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Item does not exist → add with quantity 1
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case 'REMOVE_FROM_CART': {
      // assuming payload = id
      return state.filter(item => item.productId !== action.payload);
    }

    case 'CLEAR_CART': {
      return [];
    }

    case 'INCREMENT_CART': {
      // assuming payload = id
      return state.map(item =>
        item.productId === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case 'DECREMENT_CART': {
      // assuming payload = id
      return state.map(item =>
        item.productId === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }

    default:
      return state;
  }
};

function CartProvider({children}) {

  const [cart, setCart] = useState([])

  const {user} = useAuth();

  const [cartState, dispatch] = useReducer(cartReducer, cart);


    const fetchCart = async (userId) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${userId}`);
        const {data} = await res.json()

        dispatch({ type: "SET_CART", payload: data || [] });
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    const addToCart = async (product)=> {

      const newProduct = {
        productId:product._id,
        name:product.title,
        price:product.price
      }

      dispatch({type:'ADD_TO_CART', payload:newProduct});
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/add/${user?._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      
    };
    const removeFromCart = async (id)=> {
      dispatch({type:'REMOVE_FROM_CART', payload:id})
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/delete/${id}/${user?._id}`, {
        method: "DELETE",
        credentials: "include",
      });
    };
    const clearCart = async ()=> {
      dispatch({type:'CLEAR_CART'});
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/clear/${user?._id}`, {
        method: "DELETE",
        credentials: "include",
      });
    };

    const incrementCart = async (id)=> {
      dispatch({type:'INCREMENT_CART', payload:id})
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/increment/${user?._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });
    };
    const decrementCart = async (id)=> {
      dispatch({type:'DECREMENT_CART', payload:id})
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/decrement/${user?._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });
    };


    useEffect(() => {
      if(user?._id){
        fetchCart(user?._id);
      }
    }, [user]);

  return (
    <CartContext.Provider value={{cartState, setCart, addToCart, removeFromCart, clearCart, incrementCart, decrementCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider


export const useCart = () => useContext(CartContext);









