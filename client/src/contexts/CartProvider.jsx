import React, {createContext, useContext, useState, useReducer} from 'react'


const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item._id == action.payload._id);

      if (existingItem) {
        // Item exists → increment quantity
        return state.map(item =>
          item._id == action.payload._id
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
      return state.filter(item => item._id !== action.payload);
    }

    case 'CLEAR_CART': {
      return [];
    }

    case 'INCREMENT_CART': {
      // assuming payload = id
      return state.map(item =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case 'DECREMENT_CART': {
      // assuming payload = id
      return state.map(item =>
        item._id === action.payload && item.quantity > 1
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
    const removeFromCart = (id)=> dispatch({type:'REMOVE_FROM_CART', payload:id});
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









