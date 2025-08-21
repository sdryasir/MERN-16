import React, {useState} from "react";
import { useCart } from "../contexts/CartProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthProvider";


const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^[0-9+ ]+$/, "Only digits, + and spaces allowed"),
  address1: z.string().min(3, "Address is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zip: z.string().min(3, "ZIP Code is required"),
});

const CheckoutPage = () => {



    const {cartState} = useCart()
    const {user} = useAuth();

    console.log(user);
    

    const [shippingCharges, setShippingCharges] = useState(300);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        fullname: user?.fullname || "",
        email: user?.email || "",
        },
    });

    const onSubmit = (data) => {
        console.log("✅ Form Data:", data);
    };
    
        

        const cartTotal = ()=>{
            let total = 0;
            cartState.map((item)=>{
            total = total + item.price*item.quantity;
            })
            return total;
        }

        const subTotal = cartTotal();
        
    
        const tax = subTotal * 3/100;

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        {/* Billing Address */}
        <div className="col-lg-8">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Billing Address</span>
      </h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-light p-30 mb-5">
          <div className="row">
            {/* Full Name */}
            <div className="col-md-6 form-group">
              <label>Full Name</label>
              <input
                readOnly
                className="form-control"
                type="text"
                placeholder="John"
                {...register("fullname")}
              />
              {errors.fullname && (
                <small className="text-danger">{errors.fullname.message}</small>
              )}
            </div>

            {/* Email */}
            <div className="col-md-6 form-group">
              <label>E-mail</label>
              <input
              readOnly
                className="form-control"
                type="text"
                placeholder="example@email.com"
                {...register("email")}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>

            {/* Mobile */}
            <div className="col-md-6 form-group">
              <label>Mobile No</label>
              <input
                className="form-control"
                type="text"
                placeholder="+123 456 789"
                {...register("mobile")}
              />
              {errors.mobile && (
                <small className="text-danger">{errors.mobile.message}</small>
              )}
            </div>

            {/* Address */}
            <div className="col-md-6 form-group">
              <label>Address Line 1</label>
              <input
                className="form-control"
                type="text"
                placeholder="123 Street"
                {...register("address1")}
              />
              {errors.address1 && (
                <small className="text-danger">{errors.address1.message}</small>
              )}
            </div>

            {/* Country */}
            <div className="col-md-6 form-group">
              <label>Country</label>
              <select className="custom-select" {...register("country")}>
                <option value="">Select Country</option>
                <option>United States</option>
                <option>Afghanistan</option>
                <option>Albania</option>
                <option>Algeria</option>
              </select>
              {errors.country && (
                <small className="text-danger">{errors.country.message}</small>
              )}
            </div>

            {/* City */}
            <div className="col-md-6 form-group">
              <label>City</label>
              <input
                className="form-control"
                type="text"
                placeholder="New York"
                {...register("city")}
              />
              {errors.city && (
                <small className="text-danger">{errors.city.message}</small>
              )}
            </div>

            {/* Province */}
            <div className="col-md-6 form-group">
              <label>Province</label>
              <input
                className="form-control"
                type="text"
                placeholder="New York"
                {...register("province")}
              />
              {errors.province && (
                <small className="text-danger">{errors.province.message}</small>
              )}
            </div>

            {/* ZIP */}
            <div className="col-md-6 form-group">
              <label>ZIP Code</label>
              <input
                className="form-control"
                type="text"
                placeholder="123"
                {...register("zip")}
              />
              {errors.zip && (
                <small className="text-danger">{errors.zip.message}</small>
              )}
            </div>
          </div>
        </div>
        <button className="btn btn-primary px-4" type="submit">
          Save Shipping Details
        </button>
      </form>
    </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Order Total</span>
          </h5>
          <div className="bg-light p-30 mb-5">
            <div className="border-bottom">
              <h6 className="mb-3">Products</h6>
              {
                cartState.map((item)=>{
                    return (
                        <div className="d-flex justify-content-between">
                            <p>{item.title?.length > 15 ? item.title.slice(0, 30) + "..." : item.title}</p>
                            <p>PKR. {item.price*item.quantity}</p>
                        </div>
                    )
                })
              }
              
            </div>
            <div className="border-bottom pt-3 pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6>PKR. {subTotal}</h6>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">PKR. {shippingCharges}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Tax 3%</h6>
                <h6 className="font-weight-medium">PKR. {tax}</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5>PKR. {subTotal+shippingCharges+tax}</h5>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mb-5">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Payment</span>
            </h5>
            <div className="bg-light p-30">
              <div className="form-group">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="payment"
                    id="paypal"
                  />
                  <label className="custom-control-label" htmlFor="paypal">
                    Paypal
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="payment"
                    id="directcheck"
                  />
                  <label className="custom-control-label" htmlFor="directcheck">
                    Direct Check
                  </label>
                </div>
              </div>
              <div className="form-group mb-4">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="payment"
                    id="banktransfer"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="banktransfer"
                  >
                    Bank Transfer
                  </label>
                </div>
              </div>
              <button className="btn btn-block btn-primary font-weight-bold py-3">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
