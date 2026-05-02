"use client";
import { getListings } from "@/lib/api";
import { ShoppingBag, Star, Users, MapPin } from "lucide-react";

export default function ShopsPage({ params }: { params: any }) {
  // Mock data for shops as we don't have a specific getCityShops yet
  const [shops, setShops] = React.useState<any[]>([]);
  const cityName = "Bangalore";

  React.useEffect(() => {
    getListings().then(data => setShops(data.map(l => ({
      id: l.id,
      name: l.name,
      type: l.category,
      rating: 4.5,
      employees: 12,
      address: "123 Tech Lane"
    }))));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", padding: "3rem", background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div>
        <div style={{ color: "var(--lavender)", fontSize: "0.875rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
          <MapPin size={14} /> {cityName}
        </div>
        <h1 style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>Shops & Retail</h1>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Discover and manage all registered commercial establishments.</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {[
          { label: "Total Shops", value: "12,450", icon: ShoppingBag },
          { label: "Avg Rating", value: "4.8", icon: Star },
          { label: "Total Employees", value: "84K", icon: Users },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ background: "var(--lav-dim)", padding: "1rem", borderRadius: "8px", color: "var(--lavender)" }}>
              <stat.icon size={24} />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</p>
              <p style={{ fontSize: "1.75rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)" }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Shops Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {shops.map((shop) => (
          <div key={shop.id} style={{ 
            background: "var(--surface)", border: "1px solid var(--border)", 
            borderRadius: "var(--r-xl)", padding: "1.5rem", 
            display: "flex", flexDirection: "column", gap: "1rem",
            transition: "all 0.3s ease", cursor: "pointer"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--lavender)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>{shop.name}</h3>
                <span style={{ 
                  background: "var(--lav-dim)", color: "var(--lavender)", 
                  fontSize: "10px", fontFamily: "JetBrains Mono, monospace", 
                  padding: "2px 8px", borderRadius: "4px", border: "1px solid var(--lav-border)"
                }}>{shop.type.toUpperCase()}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--lime)", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                <Star size={16} fill="var(--lime)" stroke="none" />
                {shop.rating}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={14} /> {shop.address}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Users size={14} /> {shop.employees} Employees
              </div>
            </div>
            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem", marginTop: "auto" }}>
              <button style={{ 
                background: "var(--lavender)", color: "#1a1a1a", border: "none", 
                borderRadius: "var(--r-pill)", padding: "0.5rem", flex: 1,
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem" 
              }}>View Profile</button>
              <button style={{ 
                background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)", 
                borderRadius: "var(--r-pill)", padding: "0.5rem", flex: 1,
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.85rem" 
              }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
