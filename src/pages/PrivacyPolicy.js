import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{ background: "#2c3e50", padding: "18px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <span style={{ fontSize: "24px" }}>🚚</span>
          <div>
            <div style={{ color: "white", fontWeight: "800", fontSize: "18px" }}>STeX Logistics</div>
            <div style={{ color: "#e74c3c", fontSize: "10px", letterSpacing: "2px" }}>SWIFT • TRUSTED • EXPRESS</div>
          </div>
        </div>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px", background: "#e74c3c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
          Back to Home
        </button>
      </nav>

      <div style={{ maxWidth: "900px", margin: "60px auto", padding: "0 20px" }}>
        <div style={{ background: "white", borderRadius: "16px", padding: "50px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <h1 style={{ color: "#2c3e50", fontSize: "36px", fontWeight: "900", marginBottom: "10px" }}>Privacy Policy</h1>
          <p style={{ color: "#7f8c8d", marginBottom: "40px" }}>Last updated: January 2024</p>

          {[
            {
              title: "1. Introduction",
              content: "STeX Logistics ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website services."
            },
            {
              title: "2. Information We Collect",
              content: "We collect information you provide directly to us, such as: Full name and contact information (email address, phone number), Delivery addresses (pickup and drop-off locations), Package information and delivery preferences, Payment information (processed securely through Paystack), Account credentials, Device information and push notification tokens for delivery updates."
            },
            {
              title: "3. How We Use Your Information",
              content: "We use the information we collect to: Process and fulfill your delivery orders, Send you order confirmations, updates and notifications via SMS, email and push notifications, Provide real-time package tracking, Process payments securely, Improve our services and user experience, Communicate with you about promotions and updates (with your consent), Comply with legal obligations."
            },
            {
              title: "4. Location Data",
              content: "Our delivery agents use GPS location services to provide real-time tracking of your packages. We collect location data only when actively tracking a delivery. Customers can view their delivery agent's location in real-time through our app and website. We do not store location data after delivery is complete."
            },
            {
              title: "5. Information Sharing",
              content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with: Delivery agents assigned to your order (name, phone, delivery address only), Payment processors (Paystack) for secure payment handling, SMS providers (Twilio) for delivery notifications, Analytics providers to improve our services. All third parties are bound by confidentiality agreements."
            },
            {
              title: "6. Data Security",
              content: "We implement industry-standard security measures to protect your information including: SSL/TLS encryption for all data transmission, Bcrypt password hashing, JWT token-based authentication, Secure MongoDB database with access controls, Regular security audits and updates."
            },
            {
              title: "7. Your Rights",
              content: "You have the right to: Access your personal data, Correct inaccurate data, Request deletion of your account and data, Opt-out of marketing communications, Request a copy of your data. To exercise these rights, contact us at support@stexlogistics.com."
            },
            {
              title: "8. Children's Privacy",
              content: "Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13."
            },
            {
              title: "9. Changes to This Policy",
              content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and sending an email notification. Your continued use of our services after changes constitutes acceptance."
            },
            {
              title: "10. Contact Us",
              content: "If you have questions about this Privacy Policy, please contact us at: Email: support@stexlogistics.com, Phone: +234 800 000 0000, Address: Lagos, Nigeria."
            }
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: "35px" }}>
              <h2 style={{ color: "#2c3e50", fontSize: "20px", fontWeight: "700", marginBottom: "12px", borderLeft: "4px solid #e74c3c", paddingLeft: "15px" }}>
                {section.title}
              </h2>
              <p style={{ color: "#555", lineHeight: "1.8", fontSize: "15px" }}>{section.content}</p>
            </div>
          ))}

          <div style={{ background: "#f8f9fa", borderRadius: "12px", padding: "20px", marginTop: "40px", borderLeft: "4px solid #e74c3c" }}>
            <p style={{ color: "#555", margin: 0, fontSize: "14px" }}>
              By using STeX Logistics services, you agree to this Privacy Policy. For questions or concerns, contact us at <a href="mailto:support@stexlogistics.com" style={{ color: "#e74c3c" }}>support@stexlogistics.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#2c3e50", padding: "20px 60px", textAlign: "center", marginTop: "40px" }}>
        <p style={{ color: "#95a5a6", margin: 0, fontSize: "13px" }}>© 2024 STeX Logistics. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;