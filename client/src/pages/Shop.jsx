import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";

function Shop() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
     const search = queryParams.get("search");
     const categoryId = queryParams.get("categoryId");

    

    const [prods, setProds] = useState([])


    const getProductsByCategoryId = async ()=>{
        const res = await fetch(`http://localhost:7000/products?categoryId=${categoryId}&search=${search}`);
        const products = await res.json();          
        setProds(products.products)
    }


    useEffect(()=>{
        getProductsByCategoryId();
    }, [categoryId, search])


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