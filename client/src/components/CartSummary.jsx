import React, { useState } from 'react'
import { Link } from 'react-router';
function CartSummary({total}) {


    const [shippingCharges, setShippingCharges] = useState(300);

    const subTotal = total();
    

    const tax = subTotal * 3/100;



    

  return (
    <div className="col-lg-4">
          <form className="mb-30" action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-0 p-4"
                placeholder="Coupon Code"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  Apply Coupon
                </button>
              </div>
            </div>
          </form>
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Cart Summary</span>
          </h5>
          <div className="bg-light p-30 mb-5">
            <div className="border-bottom pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6>PKR. {subTotal}</h6>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">PKR {shippingCharges}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Tax 3%</h6>
                <h6 className="font-weight-medium">PKR {tax}</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5>PKR. {subTotal+shippingCharges+tax}</h5>
              </div>
              <Link to={'/checkout'} className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                Proceed To Checkout
              </Link>
            </div>
          </div>
        </div>
  )
}

export default CartSummary