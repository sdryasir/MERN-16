import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";
import FilterSection from '../components/FilterSection'
import ProductGrid from '../components/ProductGrid';
function Shop() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
     const search = queryParams.get("search");
     const categoryId = queryParams.get("categoryId");

     const [pages, setPages] = useState(null)

    

    const [prods, setProds] = useState([])


    const getProductsByCategoryId = async ()=>{
        const res = await fetch(`http://localhost:7000/products?categoryId=${categoryId}&search=${search}`);
        const data = await res.json();  
        console.log("Shop", data);
        setPages(data.pages);
        setProds(data.products)
    }


    useEffect(()=>{
        getProductsByCategoryId();
    }, [categoryId, search])


  return (
    <div className="container-fluid">
        <div className="row px-xl-5">
            <FilterSection/>
            <ProductGrid pages={pages} products={prods}/>
        </div>
    </div>
  )
}

export default Shop