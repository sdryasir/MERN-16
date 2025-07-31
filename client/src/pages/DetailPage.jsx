import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Breadcrumb from '../components/Breadcrumb';

function DetailPage() {
  const {slug} = useParams();

  const [product, setProduct] = useState({});


  useEffect(()=>{
      const getProductbySlug = async ()=>{
        const res = await fetch(`http://localhost:7000/products/${slug}`);
        const data = await res.json();        
        setProduct(data.product[0]);
      }
      getProductbySlug();
    },[])

  return (
    <>
      <Breadcrumb/>
       <div className="container-fluid pb-5">
      <div className="row px-xl-5">
        {/* Product Carousel */}
        <div className="col-lg-5 mb-30">
          <div id="product-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner bg-light">
              {product?.galleryImages?.map((image, i) => (
                <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
                  <img className="w-100 h-100" src={image.secure_url} alt="Product" />
                </div>
              ))}
            </div>
            <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
              <i className="fa fa-2x fa-angle-left text-dark"></i>
            </a>
            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
              <i className="fa fa-2x fa-angle-right text-dark"></i>
            </a>
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-7 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <h3>{product.title}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <i className="far fa-star"></i>
              </div>
              <small className="pt-1">(99 Reviews)</small>
            </div>
            <h3 className="font-weight-semi-bold mb-4">PKR. {product.price}</h3>
            <p className="mb-4">{product.description}</p>

            {/* Sizes */}
            <div className="d-flex mb-3">
              <strong className="text-dark mr-3">Sizes:</strong>
              <form>
                {['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
                  <div className="custom-control custom-radio custom-control-inline" key={size}>
                    <input type="radio" className="custom-control-input" id={`size-${index + 1}`} name="size" />
                    <label className="custom-control-label" htmlFor={`size-${index + 1}`}>{size}</label>
                  </div>
                ))}
              </form>
            </div>

            {/* Colors */}
            <div className="d-flex mb-4">
              <strong className="text-dark mr-3">Colors:</strong>
              <form>
                {['Black', 'White', 'Red', 'Blue', 'Green'].map((color, index) => (
                  <div className="custom-control custom-radio custom-control-inline" key={color}>
                    <input type="radio" className="custom-control-input" id={`color-${index + 1}`} name="color" />
                    <label className="custom-control-label" htmlFor={`color-${index + 1}`}>{color}</label>
                  </div>
                ))}
              </form>
            </div>

            {/* Quantity & Cart */}
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-minus">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input type="text" className="form-control bg-secondary border-0 text-center" defaultValue="1" />
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-plus">
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3">
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
            </div>

            {/* Share */}
            <div className="d-flex pt-2">
              <strong className="text-dark mr-2">Share on:</strong>
              <div className="d-inline-flex">
                {['facebook-f', 'twitter', 'linkedin-in', 'pinterest'].map(platform => (
                  <a key={platform} className="text-dark px-2" href="#">
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="row px-xl-5">
        <div className="col">
          <div className="bg-light p-30">
            <ul className="nav nav-tabs mb-4" role="tablist">
              <li className="nav-item">
                <a className="nav-link active text-dark" data-toggle="tab" href="#desc">Description</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" data-toggle="tab" href="#info">Information</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" data-toggle="tab" href="#reviews">Reviews (0)</a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="desc">
                <h4 className="mb-3">Product Description</h4>
                <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
              </div>
              <div className="tab-pane fade" id="info">
                <h4 className="mb-3">Additional Information</h4>
                <p>Additional details go here.</p>
              </div>
              <div className="tab-pane fade" id="reviews">
                <h4 className="mb-4">Leave a Review</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="message">Your Review *</label>
                    <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <button type="submit" className="btn btn-primary px-3">Leave Your Review</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default DetailPage



