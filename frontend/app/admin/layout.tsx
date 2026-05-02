"use client";
import React from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "@/lib/auth";
import GeometricBackground from "@/components/ui/geometric";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth('CITY_ADMIN'); // Super Admin is also allowed by the hook

  if (loading) return null; // Hook handles redirect
  return (
    <GeometricBackground className="min-h-screen">
      <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 20 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "4rem", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </GeometricBackground>
  );
}
