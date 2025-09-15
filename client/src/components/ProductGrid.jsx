import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router";

const ProductGrid = ({ products }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10); // default
  const [currentPage, setCurrentPage] = useState(0);

  // Pagination logic
  const offset = currentPage * itemsPerPage;
  const currentItems = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(0); // reset to first page when changing page size
  };

  return (
    <div className="col-lg-9 col-md-8">
      <div className="row pb-3">
        {/* Controls */}
        <div className="col-12 pb-1">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <button className="btn btn-sm btn-light">
                <i className="fa fa-th-large"></i>
              </button>
              <button className="btn btn-sm btn-light ml-2">
                <i className="fa fa-bars"></i>
              </button>
            </div>
            <div className="ml-2">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Sorting
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item">Latest</button>
                  <button className="dropdown-item">Popularity</button>
                  <button className="dropdown-item">Best Rating</button>
                </div>
              </div>

              {/* Items per page dropdown */}
              <div className="btn-group ml-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Showing ({itemsPerPage})
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {[10, 20, 30].map((num) => (
                    <button
                      key={num}
                      className="dropdown-item"
                      onClick={() => handleItemsPerPageChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        {currentItems.length < 1 ? (
          <p>No product Found</p>
        ) : (
          currentItems.map((product) => (
            <div key={product._id} className="col-lg-4 col-md-6 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src={product?.mainImage?.secure_url}
                    alt={product?.title}
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href="#">
                      <i className="fa fa-shopping-cart"></i>
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="#">
                      <i className="fa fa-sync-alt"></i>
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="#">
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <Link to={`/products/${product.slug}`} style={{textDecoration:'none', color:'#000'}}>
                    {product?.title}
                  </Link>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="col-12">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
