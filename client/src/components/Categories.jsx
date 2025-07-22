import React from "react";

const Categories = () => {
  return (
    <div className="container-fluid pt-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {/* Repeatable Category Item */}
        {[
          "assets/img/cat-1.jpg",
          "assets/img/cat-2.jpg",
          "assets/img/cat-3.jpg",
          "assets/img/cat-4.jpg",
          "assets/img/cat-4.jpg",
          "assets/img/cat-3.jpg",
          "assets/img/cat-2.jpg",
          "assets/img/cat-1.jpg",
          "assets/img/cat-2.jpg",
          "assets/img/cat-1.jpg",
          "assets/img/cat-4.jpg",
          "assets/img/cat-3.jpg",
        ].map((img, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
            <a className="text-decoration-none" href="#">
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div
                  className="overflow-hidden"
                  style={{ width: "100px", height: "100px" }}
                >
                  <img className="img-fluid" src={`${img}`} alt={`Category ${index + 1}`} />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
