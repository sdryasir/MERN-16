import React from 'react'
import cardImg from '../assets/card.png';
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router';
import {CartContext} from '../App'
import { useContext } from 'react';

function ProductCard(props) {

  const {cart, setCart} = useContext(CartContext);

  function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .trim()
    .replace(/\s+/g, '-')         // replace spaces with hyphens
  }


  const handleAddToCart = (p)=>{

    const foundItem = cart.find((i)=>i._id == p._id)
    if(!foundItem){
      p.qty = 1
      setCart([...cart, p])
    }
    
  }

  return (
    <>
        <div className="card">
          <img src={props.product.image} className="card-img-top" alt="..."/>
          <div className="card-body text-center">
              <button className="btn btn-primary w-100 mb-4" disabled={cart.find((i)=>i._id == props.product._id)? true:false} onClick={()=>handleAddToCart(props.product)}> {cart.find((i)=>i._id == props.product._id) ? 'ALREADY IN THE CART':'ADD TO CART'}</button>
              <Link to={`/products/${props.product.slug}`} style={{textDecoration:'none', color:'#000'}}>
                <h5 className="card-title">{props.product.title}</h5>
              </Link>
              <p className="card-text">PKR. {props.product.price}</p>
              <Rating readonly={true} allowFraction={true} initialValue={props.product.rating.rate} />({props.product.rating.count})
          </div>
        </div>
    </>
  )
}

export default ProductCard



