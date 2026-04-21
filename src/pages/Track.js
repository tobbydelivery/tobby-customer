import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";
import { io } from "socket.io-client";

const BACKEND_URL = "https://tobby-delivery-backend.onrender.com";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentLocation, setAgentLocation] = useState(null);
  const [socket, setSocket] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const agentMarkerRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setTrackingNumber(id);
      handleTrackById(id);
    }
    return () => { if (socket) socket.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (order && mapRef.current && !mapInstanceRef.current) {
      initMap();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    if (agentLocation && mapInstanceRef.current) {
      updateAgentOnMap(agentLocation);
    }
  }, [agentLocation]);

  const initMap = () => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`;
      script.async = true;
      script.onload = createMap;
      document.head.appendChild(script);
    } else {
      createMap();
    }
  };

  const createMap = () => {
    const defaultCenter = { lat: 6.5244, lng: 3.3792 }; // Lagos
    const senderCoords = order?.sender?.coordinates?.coordinates;
    const recipientCoords = order?.recipient?.coordinates?.coordinates;

    const center = senderCoords
      ? { lat: senderCoords[1], lng: senderCoords[0] }
      : defaultCenter;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center,
      styles: [
        { featureType: "all", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] }
      ]
    });

    mapInstanceRef.current = map;

    // Add pickup marker
    if (senderCoords) {
      new window.google.maps.Marker({
        position: { lat: senderCoords[1], lng: senderCoords[0] },
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#3498db",
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 2
        },
        title: "Pickup Location"
      });
    }

    // Add delivery marker
    if (recipientCoords) {
      new window.google.maps.Marker({
        position: { lat: recipientCoords[1], lng: recipientCoords[0] },
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#27ae60",
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 2
        },
        title: "Delivery Location"
      });
    }

    // Draw route if both coordinates exist
    if (senderCoords && recipientCoords) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: { strokeColor: "#e74c3c", strokeWeight: 4, strokeOpacity: 0.7 }
      });
      directionsRenderer.setMap(map);

      directionsService.route({
        origin: { lat: senderCoords[1], lng: senderCoords[0] },
        destination: { lat: recipientCoords[1], lng: recipientCoords[0] },
        travelMode: window.google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === "OK") directionsRenderer.setDirections(result);
      });
    }
  };

  const updateAgentOnMap = (location) => {
    const position = { lat: location.latitude, lng: location.longitude };

    if (agentMarkerRef.current) {
      agentMarkerRef.current.setPosition(position);
    } else {
      agentMarkerRef.current = new window.google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/truck.png",
          scaledSize: new window.google.maps.Size(40, 40)
        },
        title: "Delivery Agent",
        animation: window.google.maps.Animation.BOUNCE
      });
    }
    mapInstanceRef.current.panTo(position);
  };

  const connectToSocket = (orderId) => {
    const newSocket = io(BACKEND_URL);
    newSocket.on("connect", () => {
      newSocket.emit("track_order", { orderId });
    });
    newSocket.on("agent_location", (location) => {
      setAgentLocation(location);
    });
    newSocket.on("status_update", (data) => {
      setOrder(prev => prev ? { ...prev, status: data.status } : prev);
    });
    setSocket(newSocket);
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    handleTrackById(trackingNumber);
  };

  const handleTrackById = async (id) => {
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await API.get(`/tracking/${id}`);
      setOrder(res.data.order);
      connectToSocket(res.data.order._id);
    } catch (err) {
      setError("Order not found. Please check your tracking number.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = { pending: "#f39c12", picked_up: "#3498db", in_transit: "#9b59b6", delivered: "#27ae60", cancelled: "#e74c3c", delayed: "#e67e22" };
    return colors[status] || "#95a5a6";
  };

  const getStatusStep = (status) => {
    const steps = ["pending", "picked_up", "in_transit", "delivered"];
    return steps.indexOf(status);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f4f6f8" }}>
      {/* Navbar */}
      <nav style={{ background: "#2c3e50", padding: "15px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <span style={{ fontSize: "24px" }}>🚚</span>
          <div>
            <div style={{ color: "white", fontWeight: "800", fontSize: "18px" }}>STeX Logistics</div>
            <div style={{ color: "#e74c3c", fontSize: "10px", letterSpacing: "2px" }}>SWIFT • TRUSTED • EXPRESS</div>
          </div>
        </div>
        <button onClick={() => navigate("/login")} style={{ padding: "10px 20px", background: "#e74c3c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
          Login
        </button>
      </nav>

      <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px", fontSize: "28px", fontWeight: "800" }}>
          📍 Track Your Package
        </h2>

        {/* Search Form */}
        <div style={{ background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)", marginBottom: "25px" }}>
          <form onSubmit={handleTrack} style={{ display: "flex", gap: "15px" }}>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number e.g. TRK1234567890"
              required
              style={{ flex: 1, padding: "14px 18px", border: "2px solid #ecf0f1", borderRadius: "10px", fontSize: "15px", outline: "none" }}
            />
            <button type="submit" disabled={loading} style={{ padding: "14px 30px", background: "#e74c3c", color: "white", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
              {loading ? "..." : "Track"}
            </button>
          </form>
        </div>

        {error && (
          <div style={{ background: "#fdedec", color: "#e74c3c", padding: "15px 20px", borderRadius: "10px", textAlign: "center", marginBottom: "20px", borderLeft: "4px solid #e74c3c" }}>
            {error}
          </div>
        )}

        {order && (
          <div>
            {/* Status Header */}
            <div style={{ background: getStatusColor(order.status), padding: "25px", borderRadius: "16px", color: "white", textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {order.status === "delivered" ? "✅" : order.status === "in_transit" ? "🚚" : order.status === "picked_up" ? "📦" : "⏳"}
              </div>
              <h3 style={{ margin: 0, fontSize: "22px", fontWeight: "800" }}>{order.status.replace(/_/g, " ").toUpperCase()}</h3>
              <p style={{ margin: "5px 0 0", opacity: 0.9 }}>Tracking: <strong>{order.trackingNumber}</strong></p>
              {agentLocation && (
                <div style={{ marginTop: "10px", background: "rgba(255,255,255,0.2)", padding: "8px 16px", borderRadius: "20px", display: "inline-block", fontSize: "13px" }}>
                  🔴 LIVE — Agent is {agentLocation.speed > 0 ? `moving at ${agentLocation.speed} km/h` : "nearby"}
                </div>
              )}
            </div>

            {/* Progress Steps */}
            <div style={{ background: "white", padding: "25px", borderRadius: "16px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {["Pending", "Picked Up", "In Transit", "Delivered"].map((step, i) => (
                  <div key={i} style={{ textAlign: "center", flex: 1 }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      background: i <= getStatusStep(order.status) ? "#27ae60" : "#ecf0f1",
                      color: i <= getStatusStep(order.status) ? "white" : "#95a5a6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 10px", fontWeight: "800", fontSize: "16px",
                      boxShadow: i <= getStatusStep(order.status) ? "0 4px 15px rgba(39,174,96,0.3)" : "none"
                    }}>
                      {i <= getStatusStep(order.status) ? "✓" : i + 1}
                    </div>
                    <div style={{ fontSize: "12px", color: i <= getStatusStep(order.status) ? "#27ae60" : "#95a5a6", fontWeight: "600" }}>
                      {step}
                    </div>
                    {i < 3 && <div style={{ height: "2px", background: i < getStatusStep(order.status) ? "#27ae60" : "#ecf0f1", margin: "0 -50%" }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Map */}
            <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)", marginBottom: "20px", overflow: "hidden" }}>
              <div style={{ padding: "20px 25px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0, color: "#2c3e50", fontWeight: "700" }}>🗺️ Live Map</h4>
                {agentLocation && (
                  <span style={{ background: "#eafaf1", color: "#27ae60", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                    🔴 Live Tracking Active
                  </span>
                )}
              </div>
              <div ref={mapRef} style={{ height: "400px", width: "100%" }}>
                {!window.google && (
                  <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", flexDirection: "column", gap: "10px" }}>
                    <div style={{ fontSize: "40px" }}>🗺️</div>
                    <p style={{ color: "#7f8c8d" }}>Loading map...</p>
                  </div>
                )}
              </div>
              <div style={{ padding: "15px 25px", background: "#f8f9fa", display: "flex", gap: "20px", fontSize: "13px" }}>
                <span>🔵 Pickup</span>
                <span>🟢 Delivery</span>
                <span>🚚 Agent</span>
              </div>
            </div>

            {/* Order Details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)" }}>
                <h4 style={{ color: "#3498db", marginBottom: "12px", fontWeight: "700" }}>📤 From</h4>
                <div style={{ fontWeight: "600", color: "#2c3e50" }}>{order.sender?.name}</div>
                <div style={{ color: "#7f8c8d", fontSize: "14px", marginTop: "5px" }}>{order.sender?.phone}</div>
                <div style={{ color: "#555", fontSize: "14px", marginTop: "5px" }}>{order.sender?.address}</div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)" }}>
                <h4 style={{ color: "#27ae60", marginBottom: "12px", fontWeight: "700" }}>📥 To</h4>
                <div style={{ fontWeight: "600", color: "#2c3e50" }}>{order.recipient?.name}</div>
                <div style={{ color: "#7f8c8d", fontSize: "14px", marginTop: "5px" }}>{order.recipient?.phone}</div>
                <div style={{ color: "#555", fontSize: "14px", marginTop: "5px" }}>{order.recipient?.address}</div>
              </div>
            </div>

            {/* Status History */}
            <div style={{ background: "white", borderRadius: "16px", padding: "25px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)" }}>
              <h4 style={{ color: "#2c3e50", marginBottom: "20px", fontWeight: "700" }}>📋 Delivery History</h4>
              {order.statusHistory?.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "15px", marginBottom: "15px", paddingBottom: "15px", borderBottom: i < order.statusHistory.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: getStatusColor(h.status), display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px", flexShrink: 0 }}>
                    {h.status === "delivered" ? "✓" : h.status === "in_transit" ? "🚚" : h.status === "picked_up" ? "📦" : "⏳"}
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", color: getStatusColor(h.status), fontSize: "14px" }}>
                      {h.status.replace(/_/g, " ").toUpperCase()}
                    </div>
                    <div style={{ fontSize: "13px", color: "#7f8c8d", marginTop: "3px" }}>
                      {new Date(h.timestamp).toLocaleString()}
                    </div>
                    {h.note && <div style={{ fontSize: "13px", color: "#555", marginTop: "3px" }}>{h.note}</div>}
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