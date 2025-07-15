import React from 'react'
import { useParams } from 'react-router';

function DetailPage() {
  const {slug} = useParams();

  const item = products.find((item)=>item.slug == slug)

  return (
    <div className='container'>
      <p>Category: {item.category}</p>
      <img style={{width:'200px'}} src={item.image} alt="" />
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p><strong>PKR. {item.price}</strong> </p>
      <button className="btn btn-primary w-100 mb-4">ADD TO CART</button>
    </div>
  )
}

export default DetailPage



