import React, { useContext } from 'react';
import { CartContext } from '../App';

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const handleClearCart = () => {
    setCart([]);
  };

  const handleDelete = (id) => {
    const updatedCart = cart.filter(c => c._id !== id);
    setCart(updatedCart);
  };

  const handleQtyIncrease = (item) => {
    const updatedCart = cart.map(c =>
      c._id === item._id ? { ...c, qty: c.qty + 1 } : c
    );
    setCart(updatedCart);
  };

  const handleQtyDecrease = (item) => {
    const updatedCart = cart.map(c =>
      c._id === item._id && c.qty > 1 ? { ...c, qty: c.qty - 1 } : c
    );
    setCart(updatedCart);
  };

  const handleChange = (e, item) => {
    const qty = Math.max(1, parseInt(e.target.value) || 1);
    const updatedCart = cart.map(c =>
      c._id === item._id ? { ...c, qty: qty } : c
    );
    setCart(updatedCart);
  };

  return (
    <div className='container'>
      <h2 className='my-4'>Your Cart</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <img width={50} src={item.image} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>Rs. {item.price}</td>
              <td>
                <div className='d-flex align-items-center'>
                  <button
                    className='btn btn-dark'
                    onClick={() => handleQtyDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type='number'
                    className='form-control text-center mx-1'
                    value={item.qty}
                    onChange={(e) => handleChange(e, item)}
                    style={{ width: '60px' }}
                    min="1"
                  />
                  <button
                    className='btn btn-dark'
                    onClick={() => handleQtyIncrease(item)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>Rs. {(item.price * item.qty).toFixed(2)}</td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(item._id)}
                >
                  <i className='bi bi-trash3'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cart.length > 0 && (
        <div className='d-flex justify-content-between align-items-center'>
          <h4>
            Grand Total: Rs.{" "}
            {cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}
          </h4>
          <button className='btn btn-danger' onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;






