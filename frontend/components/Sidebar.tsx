"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Database, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Activity
} from "lucide-react";
import { logout } from "@/lib/auth";

const navItems = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Manage Data", href: "/admin/manage-data", icon: Database },
  { label: "Team Access", href: "/admin/analytics", icon: Users },
  { label: "System Status", href: "#", icon: Activity },
  { label: "Security", href: "#", icon: ShieldCheck },
  { label: "Settings", href: "#", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '280px',
      background: 'rgba(255, 252, 208, 0.4)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 24px',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ marginBottom: '64px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.04em' }}>
            VEX <span style={{ color: 'var(--primary)', fontWeight: 400 }}>Admin</span>
          </div>
        </Link>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isActive ? 'var(--text)' : 'var(--text-dim)',
                background: isActive ? 'var(--surface2)' : 'transparent',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-plex)',
                fontWeight: isActive ? 600 : 400,
                border: isActive ? '1px solid var(--border)' : '1px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{ fontSize: '14px' }}>{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
        <button 
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'transparent',
            border: 'none',
            color: '#e87676',
            cursor: 'pointer',
            fontFamily: 'var(--font-plex)',
            fontWeight: 600,
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(232, 118, 118, 0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={20} />
          <span style={{ fontSize: '14px' }}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
