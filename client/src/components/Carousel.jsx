import React from "react";

const CarouselSection = () => {
  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        {/* Carousel */}
        <div className="col-lg-8">
          <div
            id="header-carousel"
            className="carousel slide carousel-fade mb-30 mb-lg-0"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
              <li data-target="#header-carousel" data-slide-to="1"></li>
              <li data-target="#header-carousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              {/* Item 1 */}
              <div className="carousel-item position-relative active" style={{ height: "430px" }}>
                <img
                  className="position-absolute w-100 h-100"
                  src="assets/img/carousel-1.jpg"
                  alt="carousel-1"
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Men Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet
                      ndiam elitr ipsum diam
                    </p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="carousel-item position-relative" style={{ height: "430px" }}>
                <img
                  className="position-absolute w-100 h-100"
                  src="assets/img/carousel-2.jpg"
                  alt="carousel-2"
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Women Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet
                      ndiam elitr ipsum diam
                    </p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="carousel-item position-relative" style={{ height: "430px" }}>
                <img
                  className="position-absolute w-100 h-100"
                  src="assets/img/carousel-3.jpg"
                  alt="carousel-3"
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Kids Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet
                      ndiam elitr ipsum diam
                    </p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Offers */}
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: "200px" }}>
            <img className="img-fluid" src="assets/img/offer-1.jpg" alt="offer-1" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="#" className="btn btn-primary">
                Shop Now
              </a>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: "200px" }}>
            <img className="img-fluid" src="assets/img/offer-2.jpg" alt="offer-2" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="#" className="btn btn-primary">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
