import React from "react";

const featuredProducts = [
  { id: 1, image: "assets/img/product-1.jpg", name: "Product Name Goes Here", price: 123, oldPrice: 123, rating: 5 },
  { id: 2, image: "assets/img/product-2.jpg", name: "Product Name Goes Here", price: 123, oldPrice: 123, rating: 4.5 },
  { id: 3, image: "assets/img/product-3.jpg", name: "Product Name Goes Here", price: 123, oldPrice: 123, rating: 3.5 },
  { id: 4, image: "assets/img/product-4.jpg", name: "Product Name Goes Here", price: 123, oldPrice: 123, rating: 3 },
  { id: 5, image: "assets/img/product-5.jpg", name: "Product Name Goes Here", price: 123, oldPrice: 123, rating: 5 },
  { id: 6, image: "assets/img/product-6.jpg", name: "Product Name Goes Here", price: 123, oldPrice: 123, rating: 4.5 },
  { id: 7, image: "assets/img/product-7.jpg", name: "Product Name Goes Here", price: 123, oldPrice: 123, rating: 3.5 },
  { id: 8, image: "assets/img/product-8.jpg", name: "Product Name Goes Here", price: 123, oldPrice: 123, rating: 3 },
];

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

const FeaturedProducts = () => {
  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Featured Products</span>
      </h2>
      <div className="row px-xl-5">
        {featuredProducts.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product.id}>
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={`${product.image}`} alt={product.name} />
                <div className="product-action">
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-shopping-cart"></i></a>
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="far fa-heart"></i></a>
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-sync-alt"></i></a>
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-search"></i></a>
                </div>
              </div>
              <div className="text-center py-4">
                <a className="h6 text-decoration-none text-truncate" href="#">{product.name}</a>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>${product.price.toFixed(2)}</h5>
                  <h6 className="text-muted ml-2"><del>${product.oldPrice.toFixed(2)}</del></h6>
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
