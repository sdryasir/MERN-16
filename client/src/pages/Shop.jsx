import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function Shop() {
    const {c_id} = useParams();

    const [prods, setProds] = useState([])


    const getProductsByCategoryId = async (cat_id)=>{
        const res = await fetch(`http://localhost:7000/cat-products/${cat_id}`);
        const products = await res.json();  
        console.log("products", products);
              
        setProds(products)
    }


    useEffect(()=>{
        getProductsByCategoryId(c_id);
    }, [])


  return (
    <div>
        {
            prods?.map((item)=>{
                return <h1>{item?.title}</h1>
            })
        }
    </div>
  )
}

export default Shop