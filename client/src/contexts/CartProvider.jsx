import React, {createContext, useContext, useState, useReducer} from 'react'


const CartContext = createContext();


const cartReducer = (state, action)=>{
    if(action.type == 'ADD_TO_CART'){
        console.log("add to card dispatcher called");
    }
    if(action.type == 'REMOVE_FROM_CART'){
        console.log('remove from the card');
    }
    if(action.type == 'CLEAR_CART'){

    }
    if(action.type =='INCREMENT_CART'){

    }
    if(action.type =='DECREMENT_CART'){

    }

}

function CartProvider({children}) {

  const [cart, setCart] = useState([])

 const [state, dispatch] = useReducer(cartReducer, cart);


    const addToCart = ()=> dispatch({type:'ADD_TO_CART'});
    const removeFromCart = ()=> dispatch({type:'REMOVE_FROM_CART'});
    const clearCart = ()=> dispatch({type:'CLEAR_CART'});
    const incrementCart = ()=> dispatch({type:'INCREMENT_CART'});
    const decrementCart = ()=> dispatch({type:'DECREMENT_CART'});

  return (
    <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, clearCart, incrementCart, decrementCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider


export const useCart = () => useContext(CartContext);