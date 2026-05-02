"use client";
import React from "react";
import CityCard from "@/components/CityCard";
import { CITIES } from "@/lib/constants";
import { MapPin, TrendingUp, Globe, Search } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function CitiesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem", padding: "64px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <FadeIn delay={200}>
            <div style={{ color: "var(--primary)", fontSize: "0.75rem", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 800 }}>
              Regional Intelligence
            </div>
          </FadeIn>
          <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: "16px" }}>Urban Intelligence Network.</h1>
          <p style={{ color: "var(--text-dim)", fontSize: "1.25rem", maxWidth: "600px", fontWeight: 300 }}>
            Monitor and explore the economic clusters driving growth across South India.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        {[
          { label: "Tracked Clusters", value: String(CITIES.length).padStart(2, '0'), icon: MapPin },
          { label: "Avg Growth", value: `+${(CITIES.reduce((s, c) => s + c.growth, 0) / CITIES.length).toFixed(1)}%`, icon: TrendingUp },
          { label: "Total Reach", value: "32M+", icon: Globe },
        ].map((stat, i) => (
          <FadeIn key={stat.label} delay={400 + (i * 100)}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "24px", padding: "32px", display: "flex", alignItems: "center", gap: "24px" }}>
              <div style={{ background: "rgba(128,126,131,0.05)", padding: "16px", borderRadius: "12px", color: "var(--primary)" }}>
                <stat.icon size={28} />
              </div>
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: "4px" }}>{stat.label}</p>
                <p style={{ fontSize: "2.5rem", fontFamily: "var(--font-plex)", fontWeight: 800, color: "var(--text)" }}>{stat.value}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Search & Filter */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "480px" }}>
          <Search size={18} style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Filter clusters by name or region..."
            style={{
              width: "100%",
              padding: "16px 20px 16px 56px",
              borderRadius: "100px",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "var(--font-plex)",
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* City Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
        {CITIES.map((city, i) => (
          <FadeIn key={city.id} delay={600 + (i * 100)}>
            <CityCard {...city} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
