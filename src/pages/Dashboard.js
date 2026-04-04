import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [form, setForm] = useState({
    senderName: "", senderPhone: "", senderAddress: "",
    recipientName: "", recipientPhone: "", recipientAddress: "",
    description: "", weight: "", fragile: false
  });
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEstimate = async () => {
    try {
      const res = await API.post("/pricing/estimate", {
        pickupAddress: form.senderAddress,
        deliveryAddress: form.recipientAddress,
        weight: parseFloat(form.weight) || 1,
        fragile: form.fragile
      });
      setPriceEstimate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();
    try {
      await API.post("/orders", {
        sender: { name: form.senderName, phone: form.senderPhone, address: form.senderAddress },
        recipient: { name: form.recipientName, phone: form.recipientPhone, address: form.recipientAddress },
        package: { description: form.description, weight: parseFloat(form.weight) || 1, fragile: form.fragile }
      });
      setMessage("Order created successfully! Check your email for confirmation.");
      setShowBooking(false);
      setForm({ senderName: "", senderPhone: "", senderAddress: "", recipientName: "", recipientPhone: "", recipientAddress: "", description: "", weight: "", fragile: false });
      setPriceEstimate(null);
      fetchOrders();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error creating order");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f39c12", picked_up: "#3498db", in_transit: "#9b59b6",
      delivered: "#27ae60", cancelled: "#e74c3c", delayed: "#e67e22"
    };
    return colors[status] || "#95a5a6";
  };

  const downloadInvoice = (orderId) => {
    const token = localStorage.getItem("token");
    window.open(`http://localhost:3000/api/invoices/${orderId}?token=${token}`, "_blank");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f4f6f8" }}>
      {/* Navbar */}
      <nav style={{ background: "#2c3e50", padding: "15px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "white", margin: 0 }}>🚚 Tobby Delivery</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ color: "white" }}>👋 {user.name}</span>
          <button onClick={logout} style={{ padding: "8px 16px", background: "#e74c3c", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        {message && (
          <div style={{ background: message.includes("success") ? "#d4edda" : "#fee", color: message.includes("success") ? "#27ae60" : "#e74c3c", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
            {message}
          </div>
        )}

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#2c3e50", margin: 0 }}>My Orders</h2>
          <button
            onClick={() => setShowBooking(!showBooking)}
            style={{ padding: "12px 25px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
          >
            + Book Delivery
          </button>
        </div>

        {/* Booking Form */}
        {showBooking && (
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", marginBottom: "30px" }}>
            <h3 style={{ color: "#2c3e50", marginBottom: "25px" }}>📦 Book a Delivery</h3>
            <form onSubmit={createOrder}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <h4 style={{ color: "#3498db", marginBottom: "15px" }}>📤 Sender Details</h4>
                  {[
                    { label: "Name", key: "senderName", placeholder: "Sender name" },
                    { label: "Phone", key: "senderPhone", placeholder: "08012345678" },
                    { label: "Address", key: "senderAddress", placeholder: "Pickup address" }
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>{f.label}</label>
                      <input
                        type="text"
                        value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        required
                        placeholder={f.placeholder}
                        style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "6px", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ color: "#27ae60", marginBottom: "15px" }}>📥 Recipient Details</h4>
                  {[
                    { label: "Name", key: "recipientName", placeholder: "Recipient name" },
                    { label: "Phone", key: "recipientPhone", placeholder: "08087654321" },
                    { label: "Address", key: "recipientAddress", placeholder: "Delivery address" }
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>{f.label}</label>
                      <input
                        type="text"
                        value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        required
                        placeholder={f.placeholder}
                        style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "6px", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <h4 style={{ color: "#2c3e50", marginBottom: "15px" }}>📋 Package Details</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>Description</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    placeholder="e.g. Electronics"
                    style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "6px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>Weight (kg)</label>
                  <input
                    type="number"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    placeholder="e.g. 2.5"
                    style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "6px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>Fragile?</label>
                  <select
                    value={form.fragile}
                    onChange={(e) => setForm({ ...form, fragile: e.target.value === "true" })}
                    style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "6px", boxSizing: "border-box" }}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>

              {/* Price Estimate */}
              <button
                type="button"
                onClick={getEstimate}
                style={{ padding: "10px 20px", background: "#9b59b6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginBottom: "15px" }}
              >
                💰 Get Price Estimate
              </button>

              {priceEstimate && (
                <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                  <strong>Distance:</strong> {priceEstimate.distanceKm} km |{" "}
                  <strong>Standard:</strong> ₦{priceEstimate.pricing?.standard?.price} ({priceEstimate.pricing?.standard?.estimatedTime}) |{" "}
                  <strong>Express:</strong> ₦{priceEstimate.pricing?.express?.price} ({priceEstimate.pricing?.express?.estimatedTime})
                </div>
              )}

              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  type="submit"
                  style={{ padding: "12px 30px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
                >
                  Book Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setShowBooking(false)}
                  style={{ padding: "12px 30px", background: "#e74c3c", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Orders List */}
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ background: "white", padding: "60px", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>📦</div>
            <h3 style={{ color: "#2c3e50" }}>No orders yet</h3>
            <p style={{ color: "#7f8c8d" }}>Click "Book Delivery" to send your first package!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {orders.map((order, i) => (
              <div key={i} style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", borderLeft: `4px solid ${getStatusColor(order.status)}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#3498db", fontSize: "16px" }}>{order.trackingNumber}</div>
                    <div style={{ color: "#555", marginTop: "5px" }}>
                      <strong>From:</strong> {order.sender?.address}
                    </div>
                    <div style={{ color: "#555" }}>
                      <strong>To:</strong> {order.recipient?.address}
                    </div>
                    <div style={{ color: "#7f8c8d", fontSize: "13px", marginTop: "5px" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ background: getStatusColor(order.status), color: "white", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "bold" }}>
                      {order.status.replace("_", " ")}
                    </span>
                    <div style={{ marginTop: "10px", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => navigate(`/track?id=${order.trackingNumber}`)}
                        style={{ padding: "6px 12px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                      >
                        📍 Track
                      </button>
                      <button
                        onClick={() => downloadInvoice(order._id)}
                        style={{ padding: "6px 12px", background: "#9b59b6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                      >
                        📄 Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;