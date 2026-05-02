"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import VexHero from "@/components/landing/VexHero";
import Cities from "@/components/landing/Cities";
import Ticker from "@/components/landing/Ticker";
import FadeIn from "@/components/animations/FadeIn";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LandingPage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    import("@/lib/api").then(({ getCities }) => {
      getCities().then(data => setCities(data));
    });
  }, []);

  const features = [
    { 
      image: "/images/features/unified.png", 
      title: "Unified Data Layer", 
      desc: "A single source of truth for South India's commercial and academic infrastructure." 
    },
    { 
      image: "/images/features/latency.png", 
      title: "Sub-Second Latency", 
      desc: "Engineered for high-frequency queries and real-time urban metrics visualization." 
    },
    { 
      image: "/images/features/verified.png", 
      title: "Verified Ecosystem", 
      desc: "Every listing is manually audited by our regional intelligence teams for 100% accuracy." 
    },
    { 
      image: "/images/features/analytics.png", 
      title: "Predictive Analytics", 
      desc: "Leveraging historical data to forecast urban growth trends and commercial shifts." 
    },
    { 
      image: "/images/features/sovereignty.png", 
      title: "Regional Sovereignty", 
      desc: "Deep-rooted understanding of South Indian cultural and economic nuances." 
    },
    { 
      image: "/images/features/api.png", 
      title: "Enterprise API", 
      desc: "Seamless integration capabilities for developers and urban planning enterprises." 
    }
  ];

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <Navbar />
      <VexHero />

      {/* City Section - Expanding Cards */}
      <Cities cities={cities} onCityClick={setSelectedCity} />

      {/* Advanced Metrics / Feature Grid */}
      <section id="capabilities" style={{ padding: '120px 64px', background: 'var(--bg)', color: 'var(--text)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <FadeIn delay={200}>
              <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#807e83', marginBottom: '16px' }}>
                System Capabilities
              </div>
            </FadeIn>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, maxWidth: '800px', margin: '0 auto', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text)' }}>
              Built for precision. <br />
              <span style={{ color: 'var(--text-muted)' }}>Powered by urban intelligence.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {features.map((feature, i) => (
              <FadeIn key={i} delay={i * 100} className="liquid-glass-light feature-card" style={{ 
                borderRadius: '32px', 
                padding: '40px', 
                border: '1px solid var(--border)', 
                transition: 'all 0.3s',
                aspectRatio: '1/1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
                <div style={{ width: '100%', height: '140px', marginBottom: '24px', borderRadius: '16px', overflow: 'hidden' }}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text)' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.5, fontWeight: 300, maxWidth: '240px' }}>{feature.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Strategy / Advisory */}
      <section id="advisory" style={{ padding: '160px 64px', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <div>
            <FadeIn delay={200}>
              <h2 style={{ fontSize: '4rem', fontWeight: 600, lineHeight: 1, marginBottom: '40px', letterSpacing: '-0.04em', color: '#fff' }}>
                Advisory <br />
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>& Strategy.</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#fff', lineHeight: 1.6, marginBottom: '48px', fontWeight: 300 }}>
                We don't just provide data; we provide direction. Our advisory arm works with visionaries to build ventures that redefine the urban experience.
              </p>
              <a href="#footer" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: '#fff',
                  color: '#000',
                  padding: '16px 40px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Start a Consultation
                </button>
              </a>
            </FadeIn>
          </div>

          <div className="liquid-glass" style={{ borderRadius: '40px', padding: '64px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 2 }}>
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>$1.2B+</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Managed Urban Impact</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                "Market Entry Strategy",
                "Asset Intelligence",
                "Demographic Synthesis",
                "Regional Expansion"
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#fff' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#807e83' }} />
                  <span style={{ fontSize: '16px', fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section style={{ padding: '120px 64px', background: 'var(--bg)', color: 'var(--text)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 600, textAlign: 'center', marginBottom: '80px', letterSpacing: '-0.02em', color: 'var(--text)' }}>Operational Philosophy.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { title: "Sourcing", desc: "Proprietary networks across South Indian municipalities ensuring first-mover data access." },
              { title: "Verification", desc: "Rigorous 3-tier validation process involving digital scraping and on-ground audits." },
              { title: "Synthesis", desc: "Advanced algorithmic modeling to convert raw data into commercial insights." }
            ].map((item, i) => (
              <div key={i} className="liquid-glass-light" style={{ borderRadius: '32px', padding: '56px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.1)', marginBottom: '32px', letterSpacing: '0.4em' }}>PHASE 0{i + 1}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '20px', color: 'var(--text)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '15px', lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      {/* Modal - Unified Experience */}
      {selectedCity && (
        <div className="flex-center" style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', padding: '24px' }}>
          <div className="liquid-glass" style={{ width: '100%', maxWidth: '600px', borderRadius: '40px', padding: '64px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 600, marginBottom: '16px', letterSpacing: '-0.03em' }}>{selectedCity}</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.125rem', marginBottom: '40px', lineHeight: 1.6, fontWeight: 300 }}>
              Accessing full regional intelligence for the {selectedCity} cluster.
              Choose a vertical to begin analysis.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Commercial Listings', count: '12.4k' },
                { title: 'Academic Institutions', count: '450+' },
                { title: 'Political Intelligence', count: '85 Nodes' }
              ].map((cat) => (
                <button key={cat.title} style={{ width: '100%', padding: '20px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 500 }}>{cat.title}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '4px' }}>{cat.count} Data Points</div>
                  </div>
                  <span style={{ opacity: 0.2 }}>↗</span>
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedCity(null)} style={{ marginTop: '48px', width: '100%', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>Return to Network Map</button>
          </div>
        </div>
      )}

      {/* Footer - Advanced */}
      <footer id="footer" style={{ padding: '120px 64px 64px', background: 'var(--bg)', borderTop: '1px solid var(--border)', color: 'var(--text)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '64px', marginBottom: '100px' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '32px' }}>VEX</div>
              <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', lineHeight: 1.6, maxWidth: '280px' }}>
                The definitive urban intelligence platform for South Indian commercial and academic ecosystems.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Network</h4>
              {['Chennai', 'Hyderabad', 'Bangalore', 'Kochi', 'Advisory'].map(item => <div key={item} style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>{item}</div>)}
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Intelligence</h4>
              {['Commercial', 'Academic', 'Political', 'Expansion', 'Data API'].map(item => <div key={item} style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>{item}</div>)}
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enterprise</h4>
              {['Start a Chat', 'Partner Program', 'Data Access', 'Privacy', 'Legal'].map(item => <div key={item} style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>{item}</div>)}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>© 2026 VEX Technologies. Precision Crafted.</div>
            <div style={{ display: 'flex', gap: '32px', color: 'var(--text-muted)', fontSize: '12px' }}>
              <span>LinkedIn</span>
              <span>X</span>
              <span>System Status: 99.9%</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Spacer for ticker */}
      <div style={{ height: '60px' }} />
    </main>
  );
}