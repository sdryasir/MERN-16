import { Link } from "react-router";

const Categories = ({categories}) => {

  

  return (
    <div className="container-fluid pt-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {/* Repeatable Category Item */}
        {categories?.map((category, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
            <Link className="text-decoration-none" to={`/shop/${category._id}`}>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div
                  className="overflow-hidden"
                  style={{ width: "100px", height: "100px" }}
                >
                  <img className="img-fluid" src={category?.image?.secure_url} alt={`Category ${index + 1}`} />
                </div>
                <div className="flex-fill pl-3">
                  <h6>{category?.title}</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
