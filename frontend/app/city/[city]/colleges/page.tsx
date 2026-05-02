"use client";
import { getCityColleges } from "@/lib/api";
import { GraduationCap, Users, BookOpen, Calendar, MapPin } from "lucide-react";

export default async function CollegesPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const colleges = await getCityColleges(city);
  const cityName = city.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", padding: "3rem", background: "var(--bg)", minHeight: "100vh" }}>
      <div>
        <div style={{ color: "var(--lavender)", fontSize: "0.875rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
          <MapPin size={14} /> {cityName}
        </div>
        <h1 style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>Colleges & Education</h1>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Academic institutions and educational ecosystems across the city.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {[
          { label: "Institutions", value: colleges.length.toString(), icon: GraduationCap },
          { label: "Top Rank", value: "#" + Math.min(...colleges.map(c => parseInt(c.rank))), icon: Users },
          { label: "Legacy Estd.", value: Math.min(...colleges.map(c => c.established)).toString(), icon: Calendar },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ background: "var(--lav-dim)", padding: "1rem", borderRadius: "8px", color: "var(--lavender)" }}>
              <stat.icon size={24} />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</p>
              <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)" }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Colleges List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {colleges.map((college, idx) => (
          <div key={college.id} style={{ 
            display: "flex", alignItems: "center", gap: "2rem", 
            background: "var(--surface)", border: "1px solid var(--border)", 
            borderRadius: "var(--r-lg)", padding: "1.5rem",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "12px",
              background: "var(--lav-dim)", border: "1px solid var(--lav-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, color: "var(--lavender)", fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800
            }}>
              {idx + 1}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>{college.name}</h3>
              <div style={{ display: "flex", gap: "1.5rem", color: "var(--text-muted)", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><Users size={14} /> {college.students} Students</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><BookOpen size={14} /> National Rank #{college.rank}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><Calendar size={14} /> Est. {college.established}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button style={{ 
                background: "var(--lavender)", color: "#1a1a1a", border: "none", 
                borderRadius: "var(--r-pill)", padding: "0.5rem 1.25rem", 
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem" 
              }}>View Details</button>
              <button style={{ 
                background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)", 
                borderRadius: "var(--r-pill)", padding: "0.5rem 1.25rem", 
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.85rem" 
              }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
