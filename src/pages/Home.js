import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        background: "#2c3e50",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ color: "white", margin: 0 }}>🚚 Tobby Delivery</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => navigate("/track")}
            style={{
              padding: "10px 20px",
              background: "transparent",
              color: "white",
              border: "2px solid white",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Track Order
          </button>
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
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "10px 20px",
              background: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #2c3e50, #3498db)",
        color: "white",
        padding: "100px 40px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Fast & Reliable Delivery Across Nigeria
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "40px", opacity: 0.9 }}>
          Send packages anywhere in Nigeria with real-time tracking and instant notifications
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "15px 40px",
              background: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Send a Package
          </button>
          <button
            onClick={() => navigate("/track")}
            style={{
              padding: "15px 40px",
              background: "white",
              color: "#2c3e50",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Track Package
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "80px 40px", background: "#f8f9fa" }}>
        <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "50px", fontSize: "32px" }}>
          Why Choose Tobby Delivery?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1000px", margin: "0 auto" }}>
          {[
            { icon: "📍", title: "Real-Time Tracking", desc: "Track your package live on the map from pickup to delivery" },
            { icon: "⚡", title: "Fast Delivery", desc: "Same day delivery within Lagos and express delivery nationwide" },
            { icon: "🔔", title: "Instant Notifications", desc: "Get SMS and email updates at every step of your delivery" },
            { icon: "💰", title: "Affordable Pricing", desc: "Competitive rates based on distance and package weight" },
            { icon: "🔒", title: "Safe & Secure", desc: "Your packages are handled with care by verified agents" },
            { icon: "📱", title: "Easy Booking", desc: "Book a delivery in minutes from your phone or computer" }
          ].map((feature, i) => (
            <div key={i} style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}>
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>{feature.icon}</div>
              <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>{feature.title}</h3>
              <p style={{ color: "#7f8c8d", lineHeight: "1.6" }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div style={{ padding: "80px 40px", background: "white" }}>
        <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "50px", fontSize: "32px" }}>
          Simple Pricing
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px", maxWidth: "700px", margin: "0 auto" }}>
          {[
            { title: "Standard Delivery", price: "From ₦1,500", time: "Same day - 2 days", color: "#3498db", features: ["Real-time tracking", "SMS notifications", "PDF invoice"] },
            { title: "Express Delivery", price: "From ₦2,500", time: "1-5 hours", color: "#27ae60", features: ["Priority handling", "Real-time tracking", "SMS & Email alerts"] }
          ].map((plan, i) => (
            <div key={i} style={{
              background: "white",
              padding: "35px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              border: `2px solid ${plan.color}`
            }}>
              <h3 style={{ color: plan.color, fontSize: "22px" }}>{plan.title}</h3>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#2c3e50", margin: "15px 0" }}>{plan.price}</div>
              <div style={{ color: "#7f8c8d", marginBottom: "20px" }}>⏱ {plan.time}</div>
              {plan.features.map((f, j) => (
                <div key={j} style={{ padding: "8px 0", color: "#555", borderBottom: "1px solid #ecf0f1" }}>✅ {f}</div>
              ))}
              <button
                onClick={() => navigate("/register")}
                style={{
                  marginTop: "25px",
                  padding: "12px 30px",
                  background: plan.color,
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                  width: "100%"
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#2c3e50", color: "white", padding: "40px", textAlign: "center" }}>
        <h3>🚚 Tobby Delivery</h3>
        <p style={{ color: "#95a5a6" }}>Fast. Reliable. Affordable.</p>
        <p style={{ color: "#95a5a6", fontSize: "14px" }}>© 2024 Tobby Delivery. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;