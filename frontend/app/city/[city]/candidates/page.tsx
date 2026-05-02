"use client";
import React from "react";
import { Briefcase, Users, Vote, TrendingUp, MapPin } from "lucide-react";

export default function CandidatesPage({ params }: { params: any }) {
  // Mock data as we don't have a specific getCityCandidates yet
  const candidates = [
    { id: 'C-001', name: 'Dr. Aruna Reddy', party: 'Independent', votes: '124,500', platform: 'Education Reform' },
    { id: 'C-002', name: 'Suresh Kumar', party: 'Socialist Front', votes: '98,200', platform: 'Public Transit' },
    { id: 'C-003', name: 'Meera Nair', party: 'Urban Development', votes: '142,300', platform: 'Green Spaces' },
  ];
  const cityName = "Bangalore";
  const totalVotes = 365000;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", padding: "3rem", background: "var(--bg)", minHeight: "100vh" }}>
      <div>
        <div style={{ color: "var(--lavender)", fontSize: "0.875rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
          <MapPin size={14} /> {cityName}
        </div>
        <h1 style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>Political Candidates</h1>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Active candidates and campaign profiles for upcoming civic elections.</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {[
          { label: "Registered Candidates", value: candidates.length.toString(), icon: Briefcase },
          { label: "Total Votes Cast", value: totalVotes.toLocaleString(), icon: Vote },
          { label: "Parties Represented", value: "3", icon: Users },
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

      {/* Candidate Profiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {candidates.map((candidate, idx) => {
          const voteCount = parseInt(candidate.votes.replace(/,/g, ""));
          const pct = Math.round((voteCount / totalVotes) * 100);
          return (
            <div key={candidate.id} style={{ 
              background: "var(--surface)", border: "1px solid var(--border)", 
              borderRadius: "var(--r-xl)", padding: "2rem", height: "100%",
              transition: "all 0.3s ease", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: "1.25rem"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--lavender)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "var(--lav-dim)", border: "1px solid var(--lav-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--lavender)", fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, flexShrink: 0
                }}>
                  {candidate.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>{candidate.name}</h3>
                  <span style={{ 
                    background: "var(--lav-dim)", color: "var(--lavender)", 
                    fontSize: "10px", fontFamily: "JetBrains Mono, monospace", 
                    padding: "2px 8px", borderRadius: "4px"
                  }}>{candidate.party.toUpperCase()}</span>
                </div>
                {idx === 2 && <div style={{ marginLeft: "auto", background: "var(--lime-dim)", color: "var(--lime)", fontSize: "10px", fontFamily: "JetBrains Mono, monospace", padding: "2px 8px", borderRadius: "var(--r-pill)", border: "1px solid rgba(178,241,66,0.25)" }}>LEADING</div>}
              </div>

              <div style={{ background: "rgba(178,135,253,0.04)", borderRadius: "12px", padding: "1rem", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", color: "var(--text-dim)", textTransform: "uppercase" }}>Platform Focus</p>
                <p style={{ fontWeight: 600, color: "var(--text)", display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.4rem", fontFamily: "var(--font-body)" }}>
                  <TrendingUp size={16} style={{ color: "var(--lavender)" }} /> {candidate.platform}
                </p>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
                  <span style={{ color: "var(--text-muted)" }}>Vote Share</span>
                  <span style={{ fontWeight: 700, color: "var(--lavender)" }}>{candidate.votes} ({pct}%)</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "var(--raisin)", borderRadius: "var(--r-pill)", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "var(--lavender)", borderRadius: "var(--r-pill)", transition: "width 1s ease-out" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem", marginTop: "auto" }}>
                <button style={{ 
                  background: "var(--lavender)", color: "#1a1a1a", border: "none", 
                  borderRadius: "var(--r-pill)", padding: "0.65rem", flex: 1,
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem" 
                }}>View Campaign</button>
                <button style={{ 
                  background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)", 
                  borderRadius: "var(--r-pill)", padding: "0.65rem", flex: 1,
                  fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.85rem" 
                }}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
