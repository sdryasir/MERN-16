import React, {useEffect, useState} from 'react'
import ProductCard from '../components/ProductCard'

function Home() {


  const [products, setProducts] = useState([]);

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1000)


  const getProductsFromAPI = async ()=>{
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json()
    setProducts(data);
  }

  useEffect(()=>{
  getProductsFromAPI();
  }, [])


  const handleSearch = (e)=>{
    if(e.target.value){
      const searchResult = products.filter((product)=>product.title.toLowerCase().includes(e.target.value.toLowerCase()))
      setProducts(searchResult);
    }else{
      getProductsFromAPI();
    }
  }
  const handleRating = (e)=>{
    if(e.target.value){
      const searchResult = products.filter((product)=>product.rating.rate>=e.target.value)
      setProducts(searchResult);
    }else{
      getProductsFromAPI();
    }
  }
  const handleprice = (e)=>{
      const searchResult = products.filter((product)=>product.price>min && product.price<=max)
      setProducts(searchResult);
  }


  return (
    <>
        <div className="container">
          {/* <button onClick={getProductsFromAPI}>Get data</button> */}
          <input type="search" className='mb-3' onChange={handleSearch} />
          <button>Search</button>

          <label htmlFor="">Filter by rating</label>
          <input type="text" onChange={handleRating} />

          <label htmlFor="">Filter by Price</label>
          <input type="text" onChange={(e)=>setMin(e.target.value)}/>
          <input type="text" onChange={(e)=>setMax(e.target.value)} />
          <button onClick={handleprice}>Filter Price</button>

            <div className="row">
                {
                  products.map((product, idx)=>(
                      <div key={idx} className="col-md-4 mb-4">
                        <ProductCard product={product} />
                      </div>
                  ))
                }
            </div>
        </div>
    </>
  )
}

export default Home
