import React, { useEffect, useState } from "react";

function OrderSuccess() {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);
  const [called, setCalled] = useState(false);


  // Grab sessionId from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("session_id");
    setSessionId(id);
  }, []);

  // Confirm order with backend once sessionId is available
  useEffect(() => {
    if (!sessionId || called) return;

    const confirmOrder = async () => {
        console.log("confirm order");
        
      try {
        setLoading(true);
        const response = await fetch("http://localhost:7000/order/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error("Failed to confirm order");
        }

        const res = await response.json();
        
        const ord = {
          id:res?.newOrder?._id,
          orderStatus:res?.newOrder?.orderStatus
        }
        

        setOrderStatus(ord);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
        setCalled(true); // prevent re-call
      }
    };

    confirmOrder();
  }, [sessionId]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Payment Successful</h1>

      {loading && <p>Confirming your order...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {orderStatus && (
        <div>
          <p>✅ Order confirmed successfully!</p>
          <p>Your Order Tracking ID: {orderStatus?.id}</p>
          <p>Order Status: {orderStatus?.orderStatus}</p>
          {/* <pre>{JSON.stringify(orderStatus, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
}

export default OrderSuccess;
