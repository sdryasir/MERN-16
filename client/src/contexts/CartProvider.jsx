import React, {createContext, useContext, useState, useReducer} from 'react'


const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existingItem = state.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        // Increase quantity if item already exists
        return state.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        return [...state, { ...item, quantity: 1 }];
      }
    }

    case 'REMOVE_FROM_CART': {
      return state.filter(item => item.id !== action.payload);
    }

    case 'CLEAR_CART': {
      return [];
    }

    case 'INCREMENT_CART': {
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case 'DECREMENT_CART': {
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
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

 const [cartState, dispatch] = useReducer(cartReducer, cart);


    const addToCart = (product)=> dispatch({type:'ADD_TO_CART', payload:product});
    const removeFromCart = ()=> dispatch({type:'REMOVE_FROM_CART'});
    const clearCart = ()=> dispatch({type:'CLEAR_CART'});
    const incrementCart = (id)=> dispatch({type:'INCREMENT_CART', payload:id});
    const decrementCart = (id)=> dispatch({type:'DECREMENT_CART', payload:id});

  return (
    <CartContext.Provider value={{cartState, setCart, addToCart, removeFromCart, clearCart, incrementCart, decrementCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider


export const useCart = () => useContext(CartContext);









