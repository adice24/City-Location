"use client";
import React, { useEffect, useState } from "react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { getKPIs, getAnalytics, KPI, AnalyticsPoint } from "@/lib/api";

export default function AnalyticsPage() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsPoint[]>([]);

  useEffect(() => {
    getKPIs().then(setKpis);
    getAnalytics().then(setAnalytics);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Header */}
      <div>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "0.2em", color: "var(--lime)", textTransform: "uppercase" }}>
          ADMIN / ANALYTICS
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", color: "var(--text)", letterSpacing: "-0.04em", marginTop: "0.5rem" }}>
          Analytics Overview
        </h1>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "1.75rem", position: "relative" }}>
            <div style={{ position: "absolute", top: "1rem", left: "1rem", width: "6px", height: "6px", borderRadius: "50%", background: kpi.up ? "var(--lime)" : "#e87676" }} />
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: "0.5rem" }}>
              {kpi.label}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.2rem", color: "var(--text)", lineHeight: 1 }}>
              {kpi.value}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "12px", color: kpi.up ? "var(--lime)" : "#e87676", marginTop: "0.5rem" }}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Line Chart */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "2rem" }}>
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--text)", marginBottom: "2rem" }}>API Calls — Last 30 Days</h3>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text-dim)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-dim)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--raisin)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", fontSize: "12px" }} />
                <Line type="monotone" dataKey="calls" stroke="var(--lavender)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "2rem" }}>
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--text)", marginBottom: "2rem" }}>Listings by City</h3>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'BLR', val: 1200 },
                { name: 'MAA', val: 840 },
                { name: 'HYD', val: 720 },
                { name: 'COK', val: 380 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-dim)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--raisin)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", fontSize: "12px" }} />
                <Bar dataKey="val" fill="var(--lav-dim)" activeBar={{ fill: 'var(--lavender)' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
