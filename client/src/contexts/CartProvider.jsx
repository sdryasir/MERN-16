import React, {createContext, useContext, useState, useReducer} from 'react'


const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      action.payload.quantity = 1;
      const newState = [...state, action.payload];
      console.log("++++++++++++", newState);
      
      return newState;
    }

    case 'REMOVE_FROM_CART': {
      console.log('Removing item from cart');

      // assuming payload = id
      const newState = state.filter(item => item.id !== action.payload);
      return newState;
    }

    case 'CLEAR_CART': {
      return [];
    }

    case 'INCREMENT_CART': {
      // assuming payload = id
      let newState = state.map(item =>
        item.id == action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      console.log("increment qty", newState);
      
      return newState
    }

    case 'DECREMENT_CART': {
      // assuming payload = id
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









