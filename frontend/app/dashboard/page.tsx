"use client";
import React, { useState, useEffect } from "react";
import { LayoutDashboard, Plus, Clock, CheckCircle2, Trash2, ArrowUpRight, RefreshCw } from "lucide-react";
import { useAuth, logout } from "@/lib/auth";
import GeometricBackground from "@/components/ui/geometric";

export default function UserDashboard() {
  const { user, loading } = useAuth('NORMAL');
  const [uploads, setUploads] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'Shop', city: 'bangalore' });
  const [syncing, setSyncing] = useState(false);

  const handleSyncAll = () => {
    setSyncing(true);
    // Simulate real-time sync
    setTimeout(() => {
      setSyncing(false);
      alert('All files, videos, and images have been optimized and synchronized across the network.');
    }, 2000);
  };

  // Mock data simulation until backend is fully connected
  useEffect(() => {
    setUploads([
      { id: '1', name: 'New Tech Cafe', category: 'Shop', city: 'Bangalore', status: 'PENDING', date: '2024-04-27' },
      { id: '2', name: 'Metro College', category: 'Education', city: 'Chennai', status: 'APPROVED', date: '2024-04-25' },
      { id: '3', name: 'Green Park', category: 'Service', city: 'Hyderabad', status: 'REJECTED', date: '2024-04-20' },
    ]);
  }, []);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newUpload = {
      id: Math.random().toString(),
      ...formData,
      status: 'PENDING',
      date: new Date().toISOString().split('T')[0]
    };
    setUploads([newUpload, ...uploads]);
    setIsModalOpen(false);
    setFormData({ name: '', category: 'Shop', city: 'bangalore' });
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="animate-spin" style={{ width: "40px", height: "40px", border: "4px solid rgba(202,40,81,0.05)", borderTopColor: "#CA2851", borderRadius: "50%" }} />
    </div>
  );

  return (
    <GeometricBackground className="min-h-screen">
      <div style={{ padding: "4rem", display: "flex", flexDirection: "column", gap: "4rem", position: "relative", zIndex: 20 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#CA2851", marginBottom: "0.5rem", fontSize: "0.875rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
              <LayoutDashboard size={18} /> User Workspace
            </div>
            <h1 style={{ fontSize: "3.5rem", fontFamily: "var(--font-plex)", fontWeight: 900, color: "#111", letterSpacing: "-0.02em" }}>Welcome, {user?.name}</h1>
            <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "1.25rem", fontFamily: "var(--font-plex)", marginTop: "0.5rem" }}>Monitor and manage your urban data contributions.</p>
          </div>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <button
              onClick={logout}
              style={{
                background: "transparent", color: "#e87676", border: "1px solid rgba(232,118,118,0.2)",
                borderRadius: "16px", padding: "1rem 1.75rem",
                fontFamily: "var(--font-plex)", fontWeight: 700,
                cursor: "pointer", transition: "all 0.3s"
              }}
            >
              LOGOUT
            </button>
            <button
              onClick={handleSyncAll}
              disabled={syncing}
              style={{
                background: "rgba(0,0,0,0.03)", color: "#111", border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: "100px", padding: "1rem 2.25rem",
                fontFamily: "var(--font-plex)", fontWeight: 700,
                display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: syncing ? "0 0 20px rgba(202,40,81,0.1)" : "none",
                opacity: syncing ? 0.7 : 1
              }}
            >
              <RefreshCw size={20} className={syncing ? "animate-spin" : ""} style={{ animation: syncing ? 'spin 1s linear infinite' : 'none' }} />
              {syncing ? "OPTIMIZING ASSETS..." : "SYNC ALL ASSETS"}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                background: "#CA2851", color: "#fff", border: "none",
                borderRadius: "100px", padding: "1rem 2.25rem",
                fontFamily: "var(--font-plex)", fontWeight: 800,
                display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 10px 25px rgba(202,40,81,0.2)"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <Plus size={22} /> SUBMIT NEW DATA
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            { label: "Total Submissions", value: uploads.length.toString(), icon: LayoutDashboard, color: "#CA2851" },
            { label: "Approved Records", value: uploads.filter(u => u.status === 'APPROVED').length.toString(), icon: CheckCircle2, color: "#4CAF50" },
            { label: "Pending Review", value: uploads.filter(u => u.status === 'PENDING').length.toString(), icon: Clock, color: "#FFC107" },
          ].map((stat, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "32px", padding: "2.5rem", display: "flex", alignItems: "center", gap: "2rem", backdropFilter: "blur(12px)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
              <div style={{ background: "rgba(202,40,81,0.05)", padding: "1.25rem", borderRadius: "16px", color: stat.color }}>
                <stat.icon size={28} />
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace", color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{stat.label}</p>
                <p style={{ fontSize: "2.5rem", fontFamily: "var(--font-plex)", fontWeight: 800, color: "#111" }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Uploads List */}
        <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "32px", overflow: "hidden", backdropFilter: "blur(12px)", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
          <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.5rem", fontFamily: "var(--font-plex)", fontWeight: 700, color: "#111" }}>Recent Submissions</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.4)" }}>
                  {["Resource Name", "Category", "City", "Status", "Date", "Actions"].map(h => (
                    <th key={h} style={{ padding: "1.5rem 2.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.03)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.01)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "1.75rem 2.5rem", fontWeight: 700, fontFamily: "var(--font-plex)", color: "#111", fontSize: "1.1rem" }}>{upload.name}</td>
                    <td style={{ padding: "1.75rem 2.5rem", color: "rgba(0,0,0,0.6)", fontFamily: "var(--font-plex)" }}>{upload.category}</td>
                    <td style={{ padding: "1.75rem 2.5rem", color: "rgba(0,0,0,0.6)", fontFamily: "var(--font-plex)" }}>{upload.city}</td>
                    <td style={{ padding: "1.75rem 2.5rem" }}>
                      <span style={{
                        padding: "6px 16px", borderRadius: "100px", fontSize: "11px", fontWeight: 800,
                        fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase",
                        background: upload.status === 'APPROVED' ? "rgba(76,175,80,0.05)" : upload.status === 'REJECTED' ? "rgba(244,67,54,0.05)" : "rgba(202,40,81,0.05)",
                        color: upload.status === 'APPROVED' ? "#4CAF50" : upload.status === 'REJECTED' ? "#F44336" : "#CA2851",
                        border: `1px solid ${upload.status === 'APPROVED' ? "rgba(76,175,80,0.1)" : "rgba(202,40,81,0.1)"}`
                      }}>
                        {upload.status}
                      </span>
                    </td>
                    <td style={{ padding: "1.75rem 2.5rem", color: "rgba(0,0,0,0.3)", fontFamily: "JetBrains Mono, monospace", fontSize: "13px" }}>{upload.date}</td>
                    <td style={{ padding: "1.75rem 2.5rem" }}>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <button style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.05)", padding: "0.6rem", borderRadius: "10px", color: "rgba(0,0,0,0.4)", cursor: "pointer" }}><ArrowUpRight size={18} /></button>
                        <button style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.05)", padding: "0.6rem", borderRadius: "10px", color: "rgba(202,40,81,0.4)", cursor: "pointer" }}><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Modal */}
        {isModalOpen && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "40px", padding: "4rem", width: "100%", maxWidth: "560px", position: "relative", boxShadow: "0 30px 100px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-plex)", fontWeight: 800, color: "#111", marginBottom: "0.75rem" }}>Submit New Resource</h3>
              <p style={{ color: "rgba(0,0,0,0.5)", marginBottom: "3rem", fontFamily: "var(--font-plex)", fontSize: "1.1rem" }}>Contribute to our global urban intelligence database.</p>

              <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ fontSize: "11px", color: "#CA2851", fontFamily: "JetBrains Mono, monospace", letterSpacing: "2px", fontWeight: 700 }}>RESOURCE NAME</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Central Library"
                    style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "16px", padding: "1.25rem", color: "#111", outline: "none", fontFamily: "var(--font-plex)", fontSize: "1.05rem" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <label style={{ fontSize: "11px", color: "#CA2851", fontFamily: "JetBrains Mono, monospace", letterSpacing: "2px", fontWeight: 700 }}>CATEGORY</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "16px", padding: "1.25rem", color: "#111", outline: "none", fontFamily: "var(--font-plex)", fontSize: "1.05rem" }}
                    >
                      <option value="Shop">Shop / Retail</option>
                      <option value="Education">Education / College</option>
                      <option value="Candidate">Political Candidate</option>
                      <option value="Service">Public Service</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <label style={{ fontSize: "11px", color: "#CA2851", fontFamily: "JetBrains Mono, monospace", letterSpacing: "2px", fontWeight: 700 }}>CITY LOCATION</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "16px", padding: "1.25rem", color: "#111", outline: "none", fontFamily: "var(--font-plex)", fontSize: "1.05rem" }}
                    >
                      <option value="bangalore">Bangalore</option>
                      <option value="chennai">Chennai</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="kochi">Kochi</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem" }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, background: "transparent", color: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,0,0,0.1)", padding: "1.25rem", borderRadius: "100px", fontFamily: "var(--font-plex)", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                  <button type="submit" style={{ flex: 1, background: "#CA2851", color: "#fff", border: "none", padding: "1.25rem", borderRadius: "100px", fontFamily: "var(--font-plex)", fontWeight: 800, cursor: "pointer", boxShadow: "0 10px 20px rgba(202,40,81,0.2)" }}>Submit Data</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </GeometricBackground>
  );
}
