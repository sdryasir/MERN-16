import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../contexts/CartProvider';
import CartSummary from '../components/CartSummary';

function Cart() {
  
  const {cartState, incrementCart, decrementCart, removeFromCart, clearCart} = useCart();



  const cartTotal = ()=>{
    let total = 0;
    cartState.map((item)=>{
      total = total + item.price*item.quantity;
    })
    return total;
  }
  

  return (
    <>
      <Breadcrumb/>
      <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
          <table className="table table-light table-borderless table-hover text-center mb-0">
            <thead className="thead-dark">
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="align-middle">

              {
                cartState?.length>0 && cartState.map((item, idx)=>(
                  <tr key={idx}>
                    <td className="align-middle">
                      <img src="img/product-1.jpg" alt="" style={{ width: "50px" }} /> {item?.title}
                    </td>
                    <td className="align-middle">PKR. {item?.price}</td>
                    <td className="align-middle">
                      <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
                        <div className="input-group-btn">
                          <button className="btn btn-sm btn-primary btn-minus" onClick={()=>decrementCart(item._id)}>
                            <i className="fa fa-minus"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm bg-secondary border-0 text-center"
                          value={item?.quantity}
                          readOnly
                        />
                        <div className="input-group-btn">
                          <button className="btn btn-sm btn-primary btn-plus" onClick={()=>incrementCart(item._id)}>
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">PKR. {item?.price * item?.quantity}</td>
                    <td className="align-middle">
                      <button className="btn btn-sm btn-danger" onClick={()=>removeFromCart(item._id)}>
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                )) 
              }
              

            </tbody>
          </table>
          <button className="btn btn-sm btn-danger" onClick={clearCart}>
            <span>Clear Cart </span>
            <i className="fa fa-times"></i>
          </button>
        </div>

        <CartSummary total={cartTotal}/>
      </div>
    </div>
    </>
  );
}

export default Cart;






