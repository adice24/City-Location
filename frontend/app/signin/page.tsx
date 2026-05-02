"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Shield, Briefcase, ArrowRight, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Component as YellowGlowBackground } from "@/components/ui/background-components";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import AnimatedHeading from "@/components/animations/AnimatedHeading";

const roleThemes = {
  'NORMAL': { accent: "#CA2851", glow: "#FFF991", label: "User" },
  'CITY_ADMIN': { accent: "#3B82F6", glow: "#DBEAFE", label: "City Admin" },
  'SUPER_ADMIN': { accent: "#7C3AED", glow: "#EDE9FE", label: "Super Admin" },
};

export default function SignInPage() {
  const [role, setRole] = useState<'NORMAL' | 'CITY_ADMIN' | 'SUPER_ADMIN'>('NORMAL');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showTrends, setShowTrends] = useState(false);
  const router = useRouter();

  const currentTheme = roleThemes[role];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response: any = await api.auth.login({ email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      if (response.user.role === 'SUPER_ADMIN') {
        router.push('/admin/manage-data');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'NORMAL', label: 'User', icon: User },
    { id: 'CITY_ADMIN', label: 'City Admin', icon: Briefcase },
    { id: 'SUPER_ADMIN', label: 'Super Admin', icon: Shield },
  ];

  return (
    <YellowGlowBackground color={currentTheme.glow} className="min-h-screen p-8 transition-colors duration-700 relative overflow-hidden">

      


      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto gap-12 lg:flex-row relative z-20 min-h-[80vh]">
        {/* Left Side: Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[480px]"
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AnimatedHeading 
                  text="CITY" 
                  initialDelay={0.5}
                  style={{ fontFamily: "var(--font-plex)", fontWeight: 900, fontSize: "3.2rem", color: "#111", letterSpacing: "-0.04em" }} 
                />
                <AnimatedHeading 
                  text="DATA" 
                  initialDelay={0.8}
                  style={{ fontFamily: "var(--font-plex)", fontWeight: 900, fontSize: "3.2rem", color: currentTheme.accent, letterSpacing: "-0.04em", transition: "color 0.4s" }} 
                />
              </div>
            </Link>
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "8px" }}
              animate={{ opacity: 1, letterSpacing: "2px" }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
              style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-plex)", marginTop: "0.5rem", textTransform: "uppercase", fontSize: "12px", fontWeight: 600 }}
            >
              Intelligence Access Portal
            </motion.p>
          </div>

          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.01, boxShadow: "0 30px 60px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "32px", padding: "3rem", backdropFilter: "blur(32px)", boxShadow: "0 20px 50px rgba(0,0,0,0.05)", position: "relative", overflow: "hidden" }}
          >
            {/* Animated Glow Overlay */}
            <motion.div 
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: `radial-gradient(circle, ${currentTheme.accent}05 0%, transparent 70%)`, pointerEvents: "none" }}
            />
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)", borderRadius: "12px", padding: "1.1rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.75rem", color: "#ef4444", fontSize: "0.95rem", overflow: "hidden" }}
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRole(r.id as any);
                    if (r.id === 'SUPER_ADMIN') {
                      setEmail('superadmin@citydata.ai');
                      setPassword('Admin@123');
                    } else if (r.id === 'CITY_ADMIN') {
                      setEmail('admin.bangalore@citydata.ai');
                      setPassword('Admin@123');
                    } else {
                      setEmail('user@citydata.ai');
                      setPassword('User@123');
                    }
                  }}
                  style={{
                    background: role === r.id ? `${currentTheme.accent}0D` : "transparent",
                    border: `1px solid ${role === r.id ? currentTheme.accent : "rgba(0,0,0,0.05)"}`,
                    borderRadius: "16px", padding: "1.2rem 0.5rem", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <r.icon size={22} style={{ color: role === r.id ? currentTheme.accent : "rgba(0,0,0,0.3)", transition: "color 0.4s" }} />
                  <span style={{ fontSize: "10px", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: role === r.id ? "#111" : "rgba(0,0,0,0.3)", textTransform: "uppercase", letterSpacing: "1px", transition: "color 0.4s" }}>{r.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ fontSize: "11px", fontFamily: "JetBrains Mono, monospace", color: currentTheme.accent, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, transition: "color 0.4s" }}>Credentials</label>
                <div style={{ position: "relative" }}>
                  <Mail size={18} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.2)" }} />
                  <input 
                    type="email" required placeholder="Enter your email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "16px", padding: "1.2rem 1.2rem 1.2rem 4rem", color: "#111", fontFamily: "var(--font-plex)", fontSize: "1rem", outline: "none" }} 
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.2)" }} />
                  <input 
                    type={showPassword ? "text" : "password"} required placeholder="Secure password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "16px", padding: "1.2rem 4rem 1.2rem 4rem", color: "#111", fontFamily: "var(--font-plex)", fontSize: "1rem", outline: "none" }} 
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(0,0,0,0.2)", cursor: "pointer" }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                style={{ background: currentTheme.accent, color: "#fff", border: "none", borderRadius: "100px", padding: "1.3rem", fontFamily: "var(--font-plex)", fontWeight: 800, fontSize: "1.1rem", cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", transition: "all 0.4s", marginTop: "1rem", opacity: loading ? 0.7 : 1, boxShadow: `0 10px 30px ${currentTheme.accent}40` }}
              >
                {loading ? "AUTHENTICATING..." : `ACCESS ${currentTheme.label.toUpperCase()}`} <ArrowRight size={22} />
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <p style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-plex)", fontSize: "0.9rem" }}>
                Don't have an account? <Link href="/signup" style={{ color: currentTheme.accent, textDecoration: "none", fontWeight: 700, transition: "color 0.4s" }}>Request Enrollment</Link>
              </p>
            </div>
            
            <button 
              onClick={() => setShowTrends(!showTrends)}
              style={{ width: "100%", marginTop: "1.5rem", background: "transparent", border: `1px dashed ${currentTheme.accent}`, color: currentTheme.accent, borderRadius: "12px", padding: "0.75rem", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
            >
              {showTrends ? "CLOSE REPORT" : "DOWNLOAD 2026 TRENDS REPORT"}
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Visme Form Integration */}
        <AnimatePresence>
          {showTrends && (
            <motion.div 
              initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 100, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[500px] z-30"
            >
              <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl relative h-[700px] border border-black/5">
                {/* VEX Loading State */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                      borderRadius: ["20%", "50%", "20%"]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "40px", height: "40px", border: "2px solid #CA2851", borderTopColor: "transparent" }}
                  />
                  <p className="mt-4 text-[10px] font-bold tracking-[3px] text-black/20 uppercase">Syncing Intelligence</p>
                </div>

                {/* Form Container */}
                <div className="relative z-10 h-full">
                  <div 
                    className="visme_d" 
                    data-title="Trends Report Download" 
                    data-url="0vmqgm86-untitled-project?fullPage=true" 
                    data-domain="forms" 
                    data-full-page="true" 
                    data-min-height="100vh" 
                    data-form-id="177268"
                  ></div>
                  <Script 
                    src="https://static-bundles.visme.co/forms/vismeforms-embed.js" 
                    strategy="afterInteractive"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p style={{ textAlign: "center", marginTop: "4rem", color: "rgba(0,0,0,0.2)", fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", position: "relative", zIndex: 20 }}>
        Encrypted Session · {role} Mode Active · Precision Urban Intelligence
      </p>
    </YellowGlowBackground>
  );
}
