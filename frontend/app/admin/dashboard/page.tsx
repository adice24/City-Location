"use client";
import Link from "next/link";
import { Activity, Users, ShieldAlert, CheckCircle2, Database, BarChart3, TrendingUp, TrendingDown, ArrowRight, AlertCircle } from "lucide-react";

const revenueMonths = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const revenueValues = [40, 60, 45, 80, 65, 90, 100, 85, 70, 95, 110, 130];
const MAX = Math.max(...revenueValues);

const recentActivity = [
  { icon: Users, color: "var(--primary)", text: "New user registered", sub: "vinayaka@cityhub.io", time: "2 min ago" },
  { icon: ShieldAlert, color: "#C8902A", text: "Failed login attempt blocked", sub: "IP 192.168.1.42", time: "15 min ago" },
  { icon: CheckCircle2, color: "#4CAF82", text: "Database backup completed", sub: "cityhub-prod-2024-05-12", time: "1 hr ago" },
  { icon: Database, color: "var(--primary)", text: "New data entry added", sub: "SHP-107 · Harbor Bistro", time: "3 hrs ago" },
  { icon: AlertCircle, color: "#C8502A", text: "Service downtime detected", sub: "City Health Hub — resolved", time: "6 hrs ago" },
  { icon: Users, color: "var(--primary)", text: "Admin role assigned", sub: "admin@cityhub.io", time: "1 day ago" },
];

const topCities = [
  { name: "Hyderabad", entries: 1204, growth: 12.4, pct: 100 },
  { name: "Bangalore", entries: 843, growth: 8.1, pct: 70 },
  { name: "Chennai", entries: 511, growth: 21.3, pct: 42 },
  { name: "Kochi", entries: 390, growth: 5.6, pct: 32 },
];

export default function AdminDashboard() {
  const kpis = [
    { label: "Active Users", value: "14,592", delta: "+2.4%", up: true, icon: Users },
    { label: "System Health", value: "99.9%", delta: "+0.1%", up: true, icon: Activity },
    { label: "Pending Entries", value: "48", delta: "-12.5%", up: false, icon: Database },
    { label: "Data Requests", value: "1,204", delta: "+8.7%", up: true, icon: BarChart3 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "3.2rem", color: "var(--text)", marginBottom: "0.6rem", fontWeight: 800 }}>Admin Dashboard</h1>
          <p style={{ color: "var(--text-muted)", opacity: 0.7, fontSize: "1.2rem" }}>Platform overview — Friday, 25 April 2026</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/admin/analytics">
            <button className="btn-secondary" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BarChart3 size={16} /> Analytics</button>
          </Link>
          <button className="btn-primary" style={{ background: 'var(--text)', border: 'none', color: 'var(--bg)', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Generate Report</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.4px" }}>{kpi.label}</span>
              <div style={{ background: "rgba(128,126,131,0.1)", padding: "0.45rem", borderRadius: "6px", color: "var(--primary)" }}>
                <kpi.icon size={16} />
              </div>
            </div>
            <div style={{ fontSize: "2.8rem", fontFamily: "var(--font-plex)", fontWeight: 800, color: 'var(--text)' }}>{kpi.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.95rem", fontWeight: 600, color: kpi.up ? "var(--primary)" : "#C8502A" }}>
              {kpi.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {kpi.delta} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "1.75rem", alignItems: "start" }}>

        {/* Revenue Bar Chart */}
        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1.2rem", color: 'var(--text)' }}>Annual Revenue Overview</h3>
            <span style={{ background: "rgba(128,126,131,0.15)", color: "var(--primary)", fontSize: "0.75rem", padding: '4px 12px', borderRadius: '100px', fontWeight: 600 }}>Fiscal 2026</span>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "180px", alignItems: "flex-end", fontSize: "0.68rem", color: "var(--text-muted)", paddingBottom: "1.4rem" }}>
              {[MAX, Math.round(MAX * 0.75), Math.round(MAX * 0.5), Math.round(MAX * 0.25), 0].map(v => <span key={v}>${v}M</span>)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ position: "relative", height: "165px", borderBottom: "1px solid var(--border)" }}>
                {[75, 50, 25].map(p => (
                  <div key={p} style={{ position: "absolute", bottom: `${p}%`, left: 0, right: 0, borderTop: "1px dashed var(--border)" }} />
                ))}
                <div style={{ display: "flex", alignItems: "flex-end", height: "100%", gap: "5px" }}>
                  {revenueValues.map((val, i) => (
                    <div key={i} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end" }}>
                      <div
                        style={{
                          width: "100%", height: `${(val / MAX) * 100}%`,
                          background: "linear-gradient(180deg, var(--primary) 0%, rgba(128,126,131,0.3) 100%)", borderRadius: "3px 3px 0 0",
                          opacity: 0.85, transition: "opacity 0.2s, height 0.4s ease", cursor: "pointer"
                        }}
                        title={`${revenueMonths[i]}: $${val}M`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "5px", paddingTop: "0.35rem" }}>
                {revenueMonths.map(m => (
                  <div key={m} style={{ flex: 1, textAlign: "center", fontSize: "0.65rem", color: "var(--text-muted)" }}>{m}</div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
            {[{ label: "Peak Month", val: "Dec — $130M" }, { label: "YTD Total", val: "$870M" }, { label: "Growth", val: "+14.3%" }].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>{s.label}</p>
                <p style={{ fontWeight: 700, color: "var(--primary)", fontSize: "0.95rem" }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: 'var(--text)' }}>Recent Activity</h3>
            <Activity size={18} style={{ color: "var(--primary)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {recentActivity.map((act, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.85rem 0",
                  borderBottom: i < recentActivity.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div style={{ background: "rgba(128,126,131,0.1)", padding: "0.5rem", borderRadius: "8px", color: act.color }}>
                  <act.icon size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: 'var(--text)' }}>{act.text}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{act.sub}</p>
                </div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{act.time}</span>
              </div>
            ))}
            <Link href="#" style={{ marginTop: "1rem" }}>
              <button style={{ width: "100%", padding: "0.6rem", background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>View All Logs <ArrowRight size={15} /></button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Cities Table */}
      <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.2rem", color: 'var(--text)' }}>Top Cities by Data Entries</h3>
          <Link href="/cities">
            <button style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem", background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>View All <ArrowRight size={14} /></button>
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {topCities.map((city, i) => (
            <div
              key={city.name}
              style={{
                display: "flex", alignItems: "center", gap: "1.5rem",
                padding: "1rem 0",
                borderBottom: i < topCities.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bg)", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: "120px" }}>
                <p style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.25rem", color: 'var(--text)' }}>{city.name}</p>
                <div style={{ height: '4px', width: '100%', background: 'var(--border)', borderRadius: '100px' }}>
                  <div style={{ height: '100%', width: `${city.pct}%`, background: 'var(--primary)', borderRadius: '100px' }} />
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--primary)" }}>{city.entries.toLocaleString()}</p>
                <p style={{ fontSize: "0.75rem", color: city.growth > 10 ? "var(--primary)" : "var(--text-muted)" }}>+{city.growth}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
