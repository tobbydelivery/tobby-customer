import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    navigate(`/track?id=${trackingNumber}`);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", margin: 0, padding: 0 }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)",
        padding: "18px 60px", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "28px" }}>🚚</span>
          <div>
            <div style={{ color: "white", fontWeight: "800", fontSize: "20px", letterSpacing: "1px" }}>STeX Logistics</div>
            <div style={{ color: "#e74c3c", fontSize: "11px", letterSpacing: "2px" }}>SWIFT • TRUSTED • EXPRESS</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <span onClick={() => navigate("/track")} style={{ color: "white", cursor: "pointer", fontSize: "14px", opacity: 0.8 }}>Track Order</span>
          <span onClick={() => navigate("/login")} style={{ color: "white", cursor: "pointer", fontSize: "14px", opacity: 0.8 }}>Login</span>
          <button onClick={() => navigate("/register")} style={{
            padding: "10px 22px", background: "#e74c3c", color: "white",
            border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold", fontSize: "14px"
          }}>Get Started</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://i.ibb.co/XkVB3qCd/B13-E95-AC-6-A36-48-B8-8-E92-E7881-B1-FB33-A.png')`,
        backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 20px"
      }}>
        <div style={{ maxWidth: "800px" }}>
          <div style={{ color: "#e74c3c", fontSize: "14px", letterSpacing: "4px", marginBottom: "20px", fontWeight: "600" }}>
            NIGERIA'S MOST RELIABLE LOGISTICS COMPANY
          </div>
          <h1 style={{
            color: "white", fontSize: "58px", fontWeight: "900", lineHeight: "1.1",
            marginBottom: "20px", textShadow: "0 2px 20px rgba(0,0,0,0.5)"
          }}>
            Delivering Your <span style={{ color: "#e74c3c" }}>Dreams</span><br />Across Nigeria
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "20px", marginBottom: "40px", lineHeight: "1.6" }}>
            Fast, reliable, and affordable delivery services with real-time tracking,
            instant notifications, and guaranteed safe delivery.
          </p>

          {/* Quick Track Form */}
          <form onSubmit={handleTrack} style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap" }}>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number..."
              style={{
                padding: "15px 25px", fontSize: "16px", borderRadius: "30px",
                border: "none", outline: "none", width: "320px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}
            />
            <button type="submit" style={{
              padding: "15px 30px", background: "#e74c3c", color: "white",
              border: "none", borderRadius: "30px", fontSize: "16px",
              fontWeight: "bold", cursor: "pointer"
            }}>
              Track Package
            </button>
          </form>

          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/register")} style={{
              padding: "15px 35px", background: "white", color: "#2c3e50",
              border: "none", borderRadius: "30px", fontSize: "16px",
              fontWeight: "bold", cursor: "pointer"
            }}>
              Send a Package
            </button>
            <button onClick={() => navigate("/track")} style={{
              padding: "15px 35px", background: "transparent", color: "white",
              border: "2px solid white", borderRadius: "30px", fontSize: "16px",
              fontWeight: "bold", cursor: "pointer"
            }}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ background: "#e74c3c", padding: "30px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", maxWidth: "1000px", margin: "0 auto", flexWrap: "wrap", gap: "20px" }}>
          {[
            { value: "10,000+", label: "Deliveries Made" },
            { value: "99%", label: "Success Rate" },
            { value: "36", label: "States Covered" },
            { value: "24/7", label: "Customer Support" }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontSize: "32px", fontWeight: "900" }}>{stat.value}</div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div style={{ padding: "100px 60px", background: "#f8f9fa" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ color: "#e74c3c", fontSize: "13px", letterSpacing: "3px", fontWeight: "600", marginBottom: "15px" }}>OUR SERVICES</div>
          <h2 style={{ color: "#2c3e50", fontSize: "40px", fontWeight: "800", margin: 0 }}>What We Offer</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { icon: "⚡", title: "Express Delivery", desc: "Same day delivery within Lagos. Get your package delivered in 1-5 hours.", color: "#e74c3c" },
            { icon: "🚚", title: "Standard Delivery", desc: "Nationwide delivery at affordable rates. Delivered within 1-3 business days.", color: "#3498db" },
            { icon: "📦", title: "Bulk Shipment", desc: "Special rates for businesses. Handle large volumes with ease and efficiency.", color: "#27ae60" },
            { icon: "❄️", title: "Fragile Items", desc: "Extra care packaging and handling for your delicate and precious items.", color: "#9b59b6" },
            { icon: "📍", title: "Real-Time Tracking", desc: "Track your delivery live on the map. Know exactly where your package is.", color: "#f39c12" },
            { icon: "🔔", title: "Instant Alerts", desc: "Get SMS and email notifications at every step of your delivery journey.", color: "#1abc9c" }
          ].map((service, i) => (
            <div key={i} style={{
              background: "white", padding: "35px", borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center",
              borderTop: `4px solid ${service.color}`
            }}>
              <div style={{ fontSize: "45px", marginBottom: "20px" }}>{service.icon}</div>
              <h3 style={{ color: "#2c3e50", marginBottom: "12px", fontSize: "18px", fontWeight: "700" }}>{service.title}</h3>
              <p style={{ color: "#7f8c8d", lineHeight: "1.7", margin: 0 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: "100px 60px", background: "white" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ color: "#e74c3c", fontSize: "13px", letterSpacing: "3px", fontWeight: "600", marginBottom: "15px" }}>SIMPLE PROCESS</div>
          <h2 style={{ color: "#2c3e50", fontSize: "40px", fontWeight: "800", margin: 0 }}>How It Works</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { step: "01", icon: "📝", title: "Book Online", desc: "Fill in pickup and delivery details on our website or app" },
            { step: "02", icon: "💰", title: "Pay Securely", desc: "Pay online with Paystack. Safe and secure payment processing" },
            { step: "03", icon: "🚚", title: "We Pick Up", desc: "Our agent picks up your package from your location" },
            { step: "04", icon: "✅", title: "Delivered!", desc: "Package delivered safely. Track every step in real time" }
          ].map((step, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#e74c3c", color: "white", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontWeight: "900" }}>
                {step.icon}
              </div>
              <div style={{ color: "#e74c3c", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", marginBottom: "8px" }}>STEP {step.step}</div>
              <h3 style={{ color: "#2c3e50", marginBottom: "10px", fontWeight: "700" }}>{step.title}</h3>
              <p style={{ color: "#7f8c8d", lineHeight: "1.6", margin: 0, fontSize: "14px" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: "100px 60px", background: "#f8f9fa" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ color: "#e74c3c", fontSize: "13px", letterSpacing: "3px", fontWeight: "600", marginBottom: "15px" }}>TESTIMONIALS</div>
          <h2 style={{ color: "#2c3e50", fontSize: "40px", fontWeight: "800", margin: 0 }}>What Our Customers Say</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { name: "Adebayo Johnson", location: "Lagos", rating: 5, text: "STeX Logistics is the best delivery service I have used in Nigeria. Fast, reliable and my package arrived in perfect condition!" },
            { name: "Chioma Okafor", location: "Abuja", rating: 5, text: "The real-time tracking feature is amazing. I could see exactly where my package was at every step. Highly recommended!" },
            { name: "Emeka Nwachukwu", location: "Port Harcourt", rating: 5, text: "Excellent customer service and very affordable prices. STeX Logistics has become my go-to delivery company." }
          ].map((review, i) => (
            <div key={i} style={{ background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div style={{ color: "#f39c12", fontSize: "20px", marginBottom: "15px" }}>{"⭐".repeat(review.rating)}</div>
              <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "20px", fontStyle: "italic" }}>"{review.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#e74c3c", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "800", fontSize: "18px" }}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#2c3e50" }}>{review.name}</div>
                  <div style={{ fontSize: "13px", color: "#7f8c8d" }}>{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div style={{ padding: "100px 60px", background: "white" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ color: "#e74c3c", fontSize: "13px", letterSpacing: "3px", fontWeight: "600", marginBottom: "15px" }}>PRICING</div>
          <h2 style={{ color: "#2c3e50", fontSize: "40px", fontWeight: "800", margin: 0 }}>Simple & Transparent</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px", maxWidth: "700px", margin: "0 auto" }}>
          {[
            { title: "Standard", price: "From ₦1,500", time: "Same day - 2 days", color: "#3498db", features: ["Real-time tracking", "SMS notifications", "PDF invoice", "Safe packaging"] },
            { title: "Express", price: "From ₦2,500", time: "1-5 hours", color: "#e74c3c", features: ["Priority handling", "Real-time tracking", "SMS & Email alerts", "Dedicated agent"], popular: true }
          ].map((plan, i) => (
            <div key={i} style={{
              background: "white", padding: "40px", borderRadius: "16px", textAlign: "center",
              boxShadow: plan.popular ? "0 10px 40px rgba(231,76,60,0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
              border: plan.popular ? `2px solid ${plan.color}` : "2px solid #ecf0f1",
              position: "relative"
            }}>
              {plan.popular && <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "#e74c3c", color: "white", padding: "4px 20px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>MOST POPULAR</div>}
              <h3 style={{ color: plan.color, fontSize: "22px", fontWeight: "800" }}>{plan.title}</h3>
              <div style={{ fontSize: "40px", fontWeight: "900", color: "#2c3e50", margin: "15px 0 5px" }}>{plan.price}</div>
              <div style={{ color: "#7f8c8d", marginBottom: "25px" }}>⏱ {plan.time}</div>
              {plan.features.map((f, j) => (
                <div key={j} style={{ padding: "10px 0", color: "#555", borderBottom: "1px solid #f0f0f0", fontSize: "14px" }}>✅ {f}</div>
              ))}
              <button onClick={() => navigate("/register")} style={{
                marginTop: "25px", padding: "14px 35px", background: plan.color,
                color: "white", border: "none", borderRadius: "30px", cursor: "pointer",
                fontWeight: "bold", fontSize: "16px", width: "100%"
              }}>Get Started</button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={{
        padding: "100px 60px", textAlign: "center",
        background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://i.ibb.co/XkVB3qCd/B13-E95-AC-6-A36-48-B8-8-E92-E7881-B1-FB33-A.png')`,
        backgroundSize: "cover", backgroundPosition: "center"
      }}>
        <h2 style={{ color: "white", fontSize: "42px", fontWeight: "900", marginBottom: "20px" }}>Ready to Ship?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", marginBottom: "40px" }}>
          Join thousands of Nigerians who trust STeX Logistics for their deliveries
        </p>
        <button onClick={() => navigate("/register")} style={{
          padding: "18px 50px", background: "#e74c3c", color: "white",
          border: "none", borderRadius: "30px", fontSize: "18px",
          fontWeight: "bold", cursor: "pointer", marginRight: "15px"
        }}>
          Start Shipping Today
        </button>
        <button onClick={() => navigate("/track")} style={{
          padding: "18px 50px", background: "transparent", color: "white",
          border: "2px solid white", borderRadius: "30px", fontSize: "18px",
          fontWeight: "bold", cursor: "pointer"
        }}>
          Track a Package
        </button>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1a252f", padding: "60px", color: "white" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", maxWidth: "1200px", margin: "0 auto 40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <span style={{ fontSize: "24px" }}>🚚</span>
              <div>
                <div style={{ fontWeight: "800", fontSize: "18px" }}>STeX Logistics</div>
                <div style={{ color: "#e74c3c", fontSize: "11px", letterSpacing: "2px" }}>SWIFT • TRUSTED • EXPRESS</div>
              </div>
            </div>
            <p style={{ color: "#95a5a6", lineHeight: "1.7", fontSize: "14px", marginBottom: "20px" }}>
              Nigeria's most reliable logistics company. We deliver your packages safely, quickly, and affordably across all 36 states.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: "📘", label: "Facebook", url: "#" },
                { icon: "📸", label: "Instagram", url: "#" },
                { icon: "🐦", label: "Twitter", url: "#" },
                { icon: "💼", label: "LinkedIn", url: "#" }
              ].map((social, i) => (
                <a key={i} href={social.url} style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: "16px" }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: "20px", color: "white", fontWeight: "700" }}>Quick Links</h4>
            {[
              { label: "Track Order", onClick: () => navigate("/track") },
              { label: "Book Delivery", onClick: () => navigate("/register") },
              { label: "Register", onClick: () => navigate("/register") },
              { label: "Login", onClick: () => navigate("/login") }
            ].map((link, i) => (
              <div key={i} onClick={link.onClick} style={{ color: "#95a5a6", marginBottom: "10px", cursor: "pointer", fontSize: "14px" }}
                onMouseEnter={e => e.target.style.color = "#e74c3c"}
                onMouseLeave={e => e.target.style.color = "#95a5a6"}>
                → {link.label}
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ marginBottom: "20px", color: "white", fontWeight: "700" }}>Services</h4>
            {["Express Delivery", "Standard Delivery", "Bulk Shipment", "Fragile Items", "Live Tracking"].map((service, i) => (
              <div key={i} style={{ color: "#95a5a6", marginBottom: "10px", fontSize: "14px" }}>→ {service}</div>
            ))}
          </div>
          <div>
            <h4 style={{ marginBottom: "20px", color: "white", fontWeight: "700" }}>Contact Us</h4>
            <div style={{ color: "#95a5a6", fontSize: "14px", lineHeight: "2" }}>
              <div>📧 support@stexlogistics.com</div>
              <div>📞 +234 800 000 0000</div>
              <div>📍 Lagos, Nigeria</div>
              <div>⏰ 24/7 Support</div>
              <div style={{ marginTop: "10px" }}>
                <a href="mailto:support@stexlogistics.com" style={{ color: "#e74c3c", textDecoration: "none", fontWeight: "600" }}>
                  Send us an email →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #2c3e50", paddingTop: "30px", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ color: "#95a5a6", fontSize: "13px" }}>
            © 2024 STeX Logistics. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
              <span key={i} style={{ color: "#95a5a6", fontSize: "13px", cursor: "pointer" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;