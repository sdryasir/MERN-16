import React, { useEffect, useState } from "react";

function OrderSuccess() {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);

  // Grab sessionId from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("session_id");
    setSessionId(id);
  }, []);

  // Confirm order with backend once sessionId is available
  useEffect(() => {
    if (!sessionId) return; // prevent running before sessionId is set

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

        console.log("++++++++++++++++++++++", res.data);
        

        setOrderStatus(res.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [sessionId]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Payment Successful</h1>
      <p>Session ID: {sessionId}</p>

      {loading && <p>Confirming your order...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {orderStatus && (
        <div>
          <p>✅ Order confirmed successfully!</p>
          <pre>{JSON.stringify(orderStatus, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default OrderSuccess;
