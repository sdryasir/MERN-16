import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { useCart } from "../contexts/CartProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router";



const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<small key={`full-${i}`} className="fa fa-star text-primary mr-1" />);
  }

  if (halfStar) {
    stars.push(<small key="half" className="fa fa-star-half-alt text-primary mr-1" />);
  }

  while (stars.length < 5) {
    stars.push(<small key={`empty-${stars.length}`} className="far fa-star text-primary mr-1" />);
  }

  return stars;
};

const FeaturedProducts = ({products}) => {


  const {addToCart, removeFromCart} = useCart();
  const {user} = useAuth();

  const navigate = useNavigate();

  const redirectUser = ()=>{
    navigate('/signin');
  }

  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Featured Products</span>
      </h2>
      <div className="row px-xl-5">
        {products?.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product._id}>
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={`${product?.mainImage?.secure_url}`} alt={product.title} />
                <div className="product-action">
                  {
                    user && user?.fullname ? <button className="btn btn-outline-dark btn-square" onClick={()=>addToCart(product)} ><i className="fa fa-shopping-cart"></i></button>:
                    <button className="btn btn-outline-dark btn-square" onClick={redirectUser}><i className="fa fa-shopping-cart"></i></button>
                  }
                  
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="far fa-heart"></i></a>
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-sync-alt"></i></a>
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-search"></i></a>
                </div>
              </div>
              <div className="text-center py-4">
                <Link className="h6 text-decoration-none" to={`/products/${product.slug}`}>{product.title}</Link>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>PKR. {product.price}</h5>
                  <h6 className="text-muted ml-2"><del>PKR. {product.discountPrice}</del></h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  {renderStars(product.rating)}
                  <small>(99)</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
