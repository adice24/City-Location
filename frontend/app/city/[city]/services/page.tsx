"use client";
import React from "react";
import { HeartHandshake, Activity, DollarSign, MapPin } from "lucide-react";

export default function ServicesPage({ params }: { params: any }) {
  // Mock data as we don't have a specific getCityServices yet
  const services = [
    { id: 'S-001', name: 'Metro Transit System', status: 'Operational', coverage: '92%', budget: '$1.2M' },
    { id: 'S-002', name: 'Smart Waste Management', status: 'In Maintenance', coverage: '75%', budget: '$450K' },
    { id: 'S-003', name: 'Urban Power Grid', status: 'Operational', coverage: '99%', budget: '$2.8M' },
    { id: 'S-004', name: 'Public Health Network', status: 'Operational', coverage: '88%', budget: '$920K' },
  ];
  const cityName = "Bangalore";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", padding: "3rem", background: "var(--bg)", minHeight: "100vh" }}>
      <div>
        <div style={{ color: "var(--lavender)", fontSize: "0.875rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
          <MapPin size={14} /> {cityName}
        </div>
        <h1 style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>Public Services</h1>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>City-managed utilities, transit, and civic services.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {[
          { label: "Total Services", value: services.length.toString(), icon: HeartHandshake },
          { label: "Operational", value: "3/4", icon: Activity },
          { label: "Annual Budget", value: "$5.37M", icon: DollarSign },
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

      {/* Services Table */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "2rem", overflow: "hidden" }}>
        <h2 style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)", marginBottom: "2rem" }}>Service Directory</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-dim)" }}>
                {["Service Name", "Status", "Coverage", "Budget", "Actions"].map(h => (
                  <th key={h} style={{ padding: "1rem", fontFamily: "JetBrains Mono, monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.2s" }}>
                  <td style={{ padding: "1.25rem 1rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text)" }}>{service.name}</td>
                  <td style={{ padding: "1.25rem 1rem" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "var(--r-pill)", fontSize: "10px", fontWeight: 700,
                      fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase",
                      background: service.status === "Operational" ? "var(--lime-dim)" : "var(--lav-dim)",
                      color: service.status === "Operational" ? "var(--lime)" : "var(--lavender)",
                      border: `1px solid ${service.status === "Operational" ? "rgba(178,241,66,0.2)" : "var(--lav-border)"}`
                    }}>
                      {service.status}
                    </span>
                  </td>
                  <td style={{ padding: "1.25rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "100px", height: "4px", background: "var(--raisin)", borderRadius: "var(--r-pill)", overflow: "hidden" }}>
                        <div style={{ width: service.coverage, height: "100%", background: "var(--lavender)" }} />
                      </div>
                      <span style={{ color: "var(--text-muted)", fontSize: "12px", fontFamily: "var(--font-body)" }}>{service.coverage}</span>
                    </div>
                  </td>
                  <td style={{ padding: "1.25rem 1rem", color: "var(--text)", fontFamily: "JetBrains Mono, monospace", fontSize: "13px" }}>{service.budget}</td>
                  <td style={{ padding: "1.25rem 1rem", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                      <button style={{ 
                        background: "var(--lav-dim)", color: "var(--lavender)", border: "1px solid var(--lav-border)", 
                        borderRadius: "var(--r-md)", padding: "0.4rem 1rem", fontSize: "0.85rem",
                        fontFamily: "var(--font-display)", fontWeight: 700
                      }}>Manage</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
