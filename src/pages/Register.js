import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #2c3e50, #27ae60)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "450px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#2c3e50", fontSize: "28px", margin: 0 }}>🚚 Tobby Delivery</h1>
          <p style={{ color: "#7f8c8d", marginTop: "8px" }}>Create your account</p>
        </div>

        {error && (
          <div style={{
            background: "#fee",
            color: "#e74c3c",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: "Full Name", key: "name", type: "text", placeholder: "John Doe" },
            { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
            { label: "Phone Number", key: "phone", type: "text", placeholder: "08012345678" },
            { label: "Password", key: "password", type: "password", placeholder: "••••••••" },
            { label: "Confirm Password", key: "confirmPassword", type: "password", placeholder: "••••••••" }
          ].map((field) => (
            <div key={field.key} style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px", color: "#2c3e50", fontWeight: "bold" }}>
                {field.label}
              </label>
              <input
                type={field.type}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                required
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #ecf0f1",
                  borderRadius: "6px",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#95a5a6" : "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#7f8c8d" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#3498db", cursor: "pointer", fontWeight: "bold" }}
          >
            Login
          </span>
        </p>
        <p style={{ textAlign: "center", color: "#7f8c8d" }}>
          <span
            onClick={() => navigate("/")}
            style={{ color: "#3498db", cursor: "pointer" }}
          >
            ← Back to Home
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;