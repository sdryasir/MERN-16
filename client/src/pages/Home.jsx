import React, {useEffect, useState} from 'react'
import CarouselSection from '../components/Carousel';
import Features from '../components/Features';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import SpecialOffers from '../components/SpecialOffers';
import RecentProducts from '../components/RecentProducts';
import { useFetch } from '../hook/useFetch';

function Home({categories}) {

  const {data:products, error, loading} = useFetch('http://localhost:7000/products');

  return (
    <>
       <CarouselSection/>
       <Features/>
       <Categories categories={categories}/>
       <FeaturedProducts products={products}/>
       <SpecialOffers/>
       <RecentProducts/>
    </>
  )
}

export default Home
