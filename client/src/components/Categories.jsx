import React, {useState, useEffect} from "react";

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
      const getAllCategories = async ()=>{
        const res = await fetch('http://localhost:7000/categories');
        const data = await res.json();
        console.log(data);
        
        setCategories(data);
      }
      getAllCategories();
    },[])


  return (
    <div className="container-fluid pt-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {/* Repeatable Category Item */}
        {categories?.map((category, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
            <a className="text-decoration-none" href="#">
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
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
