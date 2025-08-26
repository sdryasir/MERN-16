import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      fetch("http://localhost:7000/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrder(data.order);
          }
        })
        .catch((err) => console.error("Error confirming order:", err));
    }
  }, []);

  return (
    <div>
      <h1>✅ Payment Successful!</h1>
      {order ? (
        <div>
          <p>Order ID: {order._id}</p>
          <p>Total: ${order.totalAmount}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.title} x {item.quantity} - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading order...</p>
      )}
    </div>
  );
}
