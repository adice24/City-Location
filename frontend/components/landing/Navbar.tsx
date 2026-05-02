"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '24px 64px 0 64px'
    }}>
      <nav className="liquid-glass" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px',
        borderRadius: '12px',
        width: '100%'
      }}>
        {/* Left: Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>
            VEX
          </div>
        </Link>

        {/* Center: Links (Hidden on mobile) */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {[
            { label: "Story", href: "#" },
            { label: "Investing", href: "#cities" },
            { label: "Building", href: "#capabilities" },
            { label: "Advisory", href: "#advisory" }
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.875rem',
                fontWeight: 400,
                color: '#fff',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Login Button */}
        <Link href="/signin">
          <button style={{
            background: '#fff',
            color: '#000',
            padding: '8px 20px',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            Login
          </button>
        </Link>
      </nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          div[style*="padding: 24px 64px 0 64px"] {
            padding: 16px 24px 0 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
