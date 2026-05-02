"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Book, Code, Shield, Cpu } from "lucide-react";

export default function DocsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FEFEFE", color: "#0A0A0A", padding: "4rem 2rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Link href="/" style={{ color: "var(--lavender2)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
          <ArrowLeft size={18} /> Back to Hub
        </Link>
        
        <h1 style={{ fontSize: "3.5rem", fontFamily: "var(--font-display)", fontWeight: 900, marginBottom: "1.5rem" }}>Documentation</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "4rem" }}>
          Technical specifications and integration guides for the CityData Intelligence Network.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {[
            { title: "API Reference", icon: Code, desc: "RESTful endpoints for urban data ingestion." },
            { title: "System Core", icon: Cpu, desc: "Understanding the real-time processing engine." },
            { title: "Security Specs", icon: Shield, desc: "End-to-end encryption and node validation." },
            { title: "User Guides", icon: Book, desc: "Getting started with the dashboard and data visualization." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#F9FAFB", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "var(--r-lg)", padding: "2rem" }}>
              <item.icon size={24} style={{ color: "#FED809", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "#0A0A0A" }}>{item.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.6)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
