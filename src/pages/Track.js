import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await API.get(`/tracking/${trackingNumber}`);
      setOrder(res.data.order);
    } catch (err) {
      setError("Order not found. Please check your tracking number.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f39c12",
      picked_up: "#3498db",
      in_transit: "#9b59b6",
      delivered: "#27ae60",
      cancelled: "#e74c3c",
      delayed: "#e67e22"
    };
    return colors[status] || "#95a5a6";
  };

  const getStatusStep = (status) => {
    const steps = ["pending", "picked_up", "in_transit", "delivered"];
    return steps.indexOf(status);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f4f6f8" }}>
      {/* Navbar */}
      <nav style={{
        background: "#2c3e50",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ color: "white", margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}>
          🚚 Tobby Delivery
        </h2>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            background: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Login
        </button>
      </nav>

      <div style={{ maxWidth: "700px", margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
          📍 Track Your Package
        </h2>

        {/* Search Form */}
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", marginBottom: "30px" }}>
          <form onSubmit={handleTrack} style={{ display: "flex", gap: "15px" }}>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number e.g. TRK1234567890"
              required
              style={{
                flex: 1,
                padding: "14px",
                border: "2px solid #ecf0f1",
                borderRadius: "6px",
                fontSize: "16px"
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 25px",
                background: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {loading ? "..." : "Track"}
            </button>
          </form>
        </div>

        {error && (
          <div style={{ background: "#fee", color: "#e74c3c", padding: "15px", borderRadius: "8px", textAlign: "center", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {order && (
          <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            {/* Status Header */}
            <div style={{ background: getStatusColor(order.status), padding: "25px", color: "white", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                {order.status === "delivered" ? "✅" : order.status === "in_transit" ? "🚚" : order.status === "picked_up" ? "📦" : "⏳"}
              </div>
              <h3 style={{ margin: 0, fontSize: "22px" }}>{order.status.replace("_", " ").toUpperCase()}</h3>
              <p style={{ margin: "5px 0 0", opacity: 0.9 }}>Tracking: {order.trackingNumber}</p>
            </div>

            {/* Progress Steps */}
            <div style={{ padding: "25px", borderBottom: "1px solid #ecf0f1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {["Pending", "Picked Up", "In Transit", "Delivered"].map((step, i) => (
                  <div key={i} style={{ textAlign: "center", flex: 1 }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: i <= getStatusStep(order.status) ? "#27ae60" : "#ecf0f1",
                      color: i <= getStatusStep(order.status) ? "white" : "#95a5a6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                      fontWeight: "bold"
                    }}>
                      {i <= getStatusStep(order.status) ? "✓" : i + 1}
                    </div>
                    <div style={{ fontSize: "12px", color: i <= getStatusStep(order.status) ? "#27ae60" : "#95a5a6" }}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details */}
            <div style={{ padding: "25px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
                  <h4 style={{ color: "#2c3e50", marginBottom: "10px" }}>📤 From</h4>
                  <div style={{ color: "#555" }}>{order.sender?.name}</div>
                  <div style={{ color: "#7f8c8d", fontSize: "14px" }}>{order.sender?.address}</div>
                </div>
                <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
                  <h4 style={{ color: "#2c3e50", marginBottom: "10px" }}>📥 To</h4>
                  <div style={{ color: "#555" }}>{order.recipient?.name}</div>
                  <div style={{ color: "#7f8c8d", fontSize: "14px" }}>{order.recipient?.address}</div>
                </div>
              </div>

              {/* Status History */}
              <h4 style={{ color: "#2c3e50", marginBottom: "15px" }}>📋 Status History</h4>
              {order.statusHistory?.map((h, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: "15px",
                  marginBottom: "12px",
                  padding: "10px",
                  background: "#f8f9fa",
                  borderRadius: "6px",
                  borderLeft: `4px solid ${getStatusColor(h.status)}`
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", color: getStatusColor(h.status) }}>
                      {h.status.replace("_", " ").toUpperCase()}
                    </div>
                    <div style={{ fontSize: "13px", color: "#7f8c8d" }}>
                      {new Date(h.timestamp).toLocaleString()}
                    </div>
                    {h.note && <div style={{ fontSize: "13px", color: "#555" }}>{h.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;