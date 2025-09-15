import React from "react";

const FilterSection = ({ title, options, name }) => {
  return (
    <div className="mb-4">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">{title}</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {options.map((option, index) => (
            <div
              key={index}
              className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id={`${name}-${index}`}
                defaultChecked={option.checked}
              />
              <label
                className="custom-control-label"
                htmlFor={`${name}-${index}`}
              >
                {option.label}
              </label>
              <span className="badge border font-weight-normal">
                {option.count}
              </span>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

const ShopSidebar = () => {
  const priceOptions = [
    { label: "All Price", count: 1000, checked: true },
    { label: "$0 - $100", count: 150 },
    { label: "$100 - $200", count: 295 },
    { label: "$200 - $300", count: 246 },
    { label: "$300 - $400", count: 145 },
    { label: "$400 - $500", count: 168 },
  ];

  const colorOptions = [
    { label: "All Color", count: 1000, checked: true },
    { label: "Black", count: 150 },
    { label: "White", count: 295 },
    { label: "Red", count: 246 },
    { label: "Blue", count: 145 },
    { label: "Green", count: 168 },
  ];

  const sizeOptions = [
    { label: "All Size", count: 1000, checked: true },
    { label: "XS", count: 150 },
    { label: "S", count: 295 },
    { label: "M", count: 246 },
    { label: "L", count: 145 },
    { label: "XL", count: 168 },
  ];

  return (
    <div className="col-lg-3 col-md-4">
      <FilterSection title="Filter by price" options={priceOptions} name="price" />
      <FilterSection title="Filter by color" options={colorOptions} name="color" />
      <FilterSection title="Filter by size" options={sizeOptions} name="size" />
    </div>
  );
};

export default ShopSidebar;
