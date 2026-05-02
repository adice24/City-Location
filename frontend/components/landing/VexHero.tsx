"use client";
import React from "react";
import AnimatedHeading from "../animations/AnimatedHeading";
import FadeIn from "../animations/FadeIn";

export default function VexHero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Video Background - Raw, no overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
      />

      {/* Hero Content - Bottom Aligned */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 64px 64px 64px' // Approx lg:px-16 pb-16
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'flex-end',
          width: '100%'
        }}>
          
          {/* Left Column: Heading + Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <AnimatedHeading 
              text={"Shaping tomorrow\nwith vision and action."} 
              initialDelay={0.4}
              charDelay={0.04}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '16px',
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                fontFamily: 'var(--font-plex)'
              }}
            />
            
            <FadeIn delay={1500} duration={1200}>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-dim)', marginBottom: '32px', maxWidth: '520px', fontWeight: 300, lineHeight: 1.6, letterSpacing: '-0.02em' }}>
                We back visionaries and craft ventures that define the next generation of urban intelligence.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a href="#footer" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'var(--text)',
                  color: 'var(--bg)',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#807e83'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--text)'}
                >
                  Start a Chat
                </button>
              </a>
              <a href="#cities" style={{ textDecoration: 'none' }}>
                <button className="liquid-glass-light" style={{
                  color: 'var(--text)',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontWeight: 500,
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--text)';
                  e.currentTarget.style.color = 'var(--bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text)';
                }}
                >
                  Explore Now
                </button>
              </a>
            </FadeIn>
          </div>

          {/* Right Column: Tag Card */}
          <div className="tag-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass-light" style={{
                border: '1px solid var(--border)',
                padding: '12px 24px',
                borderRadius: '12px'
              }}>
                <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 300, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                  Investing. Building. Advisory.
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .tag-container {
            justify-content: flex-start !important;
            margin-top: 32px;
          }
        }
        @media (max-width: 768px) {
          div[style*="padding: 0 64px 64px 64px"] {
            padding: 0 24px 48px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
