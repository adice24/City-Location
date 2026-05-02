"use client";
import React from "react";
import { MapPin, TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CityCardProps {
  name: string;
  region: string;
  population: string;
  growth: number;
}

export default function CityCard({ name, region, population, growth }: CityCardProps) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '24px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.borderColor = 'var(--primary)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
            {region}
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>{name}</h3>
        </div>
        <div style={{ background: 'var(--surface2)', padding: '10px', borderRadius: '12px', color: 'var(--text)' }}>
          <MapPin size={20} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: 'var(--surface2)', padding: '16px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '11px', marginBottom: '4px' }}>
            <Users size={12} /> Population
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{population}</div>
        </div>
        <div style={{ background: 'var(--surface2)', padding: '16px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '11px', marginBottom: '4px' }}>
            <TrendingUp size={12} /> Growth
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>+{growth}%</div>
        </div>
      </div>

      <Link href={`/city/${name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
        <button style={{
          width: '100%',
          padding: '14px',
          borderRadius: '100px',
          background: 'var(--text)',
          color: 'var(--bg)',
          border: 'none',
          fontFamily: 'var(--font-plex)',
          fontWeight: 700,
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          Explore Data <ArrowRight size={16} />
        </button>
      </Link>
    </div>
  );
}
