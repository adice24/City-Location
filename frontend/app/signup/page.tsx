"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Shield, Briefcase, ArrowRight, Mail, Lock, UserPlus, Eye, EyeOff, AlertCircle } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Component as YellowGlowBackground } from "@/components/ui/background-components";
import AnimatedHeading from "@/components/animations/AnimatedHeading";

const roleThemes = {
  'NORMAL': { accent: "#CA2851", glow: "#FFF991", label: "User" },
  'CITY_ADMIN': { accent: "#3B82F6", glow: "#DBEAFE", label: "City Admin" },
  'SUPER_ADMIN': { accent: "#7C3AED", glow: "#EDE9FE", label: "Super Admin" },
};

export default function SignUpPage() {
  const [role, setRole] = useState<'NORMAL' | 'CITY_ADMIN' | 'SUPER_ADMIN'>('NORMAL');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const router = useRouter();

  const currentTheme = roleThemes[role];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError('');
    
    try {
      const response: any = await api.auth.signup({ ...formData, role });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.push('/dashboard');
    } catch (err: any) {
      if (err instanceof ApiError && err.details) {
        const newErrors: Record<string, string> = {};
        err.details.forEach((detail: any) => {
          newErrors[detail.path] = detail.message;
        });
        setErrors(newErrors);
      } else {
        setGeneralError(err.message || 'Enrollment failed. Please try again.');
      }
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
    <YellowGlowBackground color={currentTheme.glow} className="min-h-screen p-8 transition-colors duration-700 relative overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-[520px] relative z-20">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AnimatedHeading 
                text="ENROLL" 
                initialDelay={0.5}
                style={{ fontFamily: "var(--font-plex)", fontWeight: 900, fontSize: "3.2rem", color: "#111", letterSpacing: "-0.04em" }} 
              />
              <AnimatedHeading 
                text="MENT" 
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
            Join the CityData Intelligence Network
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
            {generalError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)", borderRadius: "12px", padding: "1.1rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.75rem", color: "#ef4444", fontSize: "0.95rem", overflow: "hidden" }}
              >
                <AlertCircle size={18} />
                {generalError}
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id as any)}
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

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <label style={{ fontSize: "11px", fontFamily: "JetBrains Mono, monospace", color: currentTheme.accent, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, transition: "color 0.4s" }}>Organization Profile</label>
              
              <div style={{ position: "relative" }}>
                <User size={18} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.2)" }} />
                <input 
                  type="text" required placeholder="Full Name" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: `1px solid ${errors.name ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0,0,0,0.05)'}`, borderRadius: "16px", padding: "1.2rem 1.2rem 1.2rem 4rem", color: "#111", fontFamily: "var(--font-plex)", fontSize: "1rem", outline: "none" }} 
                />
              </div>

              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.2)" }} />
                <input 
                  type="email" required placeholder="Email Address" 
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: `1px solid ${errors.email ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0,0,0,0.05)'}`, borderRadius: "16px", padding: "1.2rem 1.2rem 1.2rem 4rem", color: "#111", fontFamily: "var(--font-plex)", fontSize: "1rem", outline: "none" }} 
                />
              </div>

              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.2)" }} />
                <input 
                  type={showPassword ? "text" : "password"} required placeholder="Secure Password"
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: `1px solid ${errors.password ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0,0,0,0.05)'}`, borderRadius: "16px", padding: "1.2rem 4rem 1.2rem 4rem", color: "#111", fontFamily: "var(--font-plex)", fontSize: "1rem", outline: "none" }} 
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
              {loading ? "ENROLLING..." : "CREATE ACCOUNT"} <UserPlus size={22} />
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-plex)", fontSize: "0.9rem" }}>
              Already a member? <Link href="/signin" style={{ color: currentTheme.accent, textDecoration: "none", fontWeight: 700, transition: "color 0.4s" }}>Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>

      <p style={{ textAlign: "center", position: "absolute", bottom: "2rem", width: "100%", color: "rgba(0,0,0,0.2)", fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", zIndex: 20 }}>
        Secure Enrollment · {role} Access Request · CityData Protocol
      </p>
    </YellowGlowBackground>
  );
}
