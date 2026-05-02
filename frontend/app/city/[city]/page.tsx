"use client";
import Link from "next/link";
import { MapPin, Building2, GraduationCap, Briefcase, HeartHandshake, ArrowRight, TrendingUp, Activity, Shield } from "lucide-react";
import { getCityDetails } from "@/lib/api";
import dynamic from "next/dynamic";

const GradientSphere = dynamic(() => import("@/components/GradientSphere"), { ssr: false });

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getCityDetails(city);
  const cityName = cityData ? cityData.name : city.charAt(0).toUpperCase() + city.slice(1);

  const quickStats = [
    { title: "Total Listings", value: cityData ? cityData.count.toLocaleString() : "0", trend: "+12.5%", icon: Activity, accent: "var(--lavender)" },
    { title: "Active Projects", value: "342", trend: "+5.2%", icon: TrendingUp, accent: "var(--lime)" },
    { title: "Security Score", value: "98.4", trend: "Optimal", icon: Shield, accent: "var(--lavender)" },
  ];

  const directories = [
    { name: "Shops & Retail", icon: Building2, count: "12,450", href: `/city/${city}/shops`, description: "Commercial establishments and local businesses" },
    { name: "Colleges & Education", icon: GraduationCap, count: "45", href: `/city/${city}/colleges`, description: "Universities, colleges, and institutions" },
    { name: "Political Candidates", icon: Briefcase, count: "18", href: `/city/${city}/candidates`, description: "Active political candidates & campaigns" },
    { name: "Public Services", icon: HeartHandshake, count: "256", href: `/city/${city}/services`, description: "City-run utilities, transit, and civic services" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "3rem", background: "transparent", minHeight: "100vh", position: "relative" }}>
      <GradientSphere />
      
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* City Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--lavender)", marginBottom: "0.5rem", fontSize: "0.875rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace" }}>
              <MapPin size={18} /> City Profile
            </div>
            <h1 style={{ fontSize: "3.5rem", fontFamily: "var(--font-display)", fontWeight: 900, color: "var(--text)", marginBottom: "1rem", letterSpacing: "-0.04em" }}>{cityName}</h1>
            <p style={{ color: "var(--text-muted)", opacity: 0.8, maxWidth: "600px", fontSize: "1.1rem", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
              Comprehensive overview of {cityName}&apos;s urban infrastructure, economic indicators, and civic engagement metrics.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ 
              background: "transparent", color: "var(--text)", border: "1px solid var(--border)", 
              borderRadius: "var(--r-pill)", padding: "0.75rem 1.5rem", 
              fontFamily: "var(--font-body)", fontWeight: 500 
            }}>Export Report</button>
            <button style={{ 
              background: "var(--lavender)", color: "#1a1a1a", border: "none", 
              borderRadius: "var(--r-pill)", padding: "0.75rem 1.5rem", 
              fontFamily: "var(--font-display)", fontWeight: 700 
            }}>Manage Data</button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {quickStats.map((stat, idx) => (
            <div key={idx} style={{ 
              background: "var(--surface)", border: "1px solid var(--border)", 
              borderRadius: "var(--r-lg)", padding: "2rem", position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: stat.accent }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.title}</span>
                <stat.icon size={18} style={{ color: stat.accent }} />
              </div>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "12px", fontFamily: "var(--font-display)", fontWeight: 600, color: stat.accent, marginTop: "0.75rem" }}>{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Directories */}
        <section>
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "2px", color: "var(--lavender)", textTransform: "uppercase" }}>Directory Index</span>
            <h2 style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text)", marginTop: "0.5rem" }}>City Infrastructure</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {directories.map((dir) => (
              <Link
                key={dir.name}
                href={dir.href}
                style={{ textDecoration: "none" }}
              >
                <div style={{ 
                  background: "var(--surface)", border: "1px solid var(--border)", 
                  borderRadius: "var(--r-xl)", padding: "2rem", height: "100%",
                  transition: "all 0.3s ease", cursor: "pointer",
                  display: "flex", flexDirection: "column", gap: "1.25rem"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--lavender)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    <div style={{ background: "var(--lav-dim)", padding: "1rem", borderRadius: "12px", color: "var(--lavender)", flexShrink: 0 }}>
                      <dir.icon size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)", marginBottom: "0.2rem" }}>{dir.name}</h3>
                      <span style={{ color: "var(--text-dim)", fontFamily: "JetBrains Mono, monospace", fontSize: "10px", textTransform: "uppercase" }}>{dir.count} Listings</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.9rem", fontFamily: "var(--font-body)", color: "var(--text-muted)", lineHeight: 1.5 }}>{dir.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--lavender)", fontWeight: 700, marginTop: "auto", fontSize: "0.85rem", fontFamily: "var(--font-display)" }}>
                    EXPLORE <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
