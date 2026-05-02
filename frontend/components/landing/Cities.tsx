"use client";
import React from "react";
import { TrailCard } from "@/components/ui/trail-card";
import FadeIn from "../animations/FadeIn";
import AnimatedHeading from "../animations/AnimatedHeading";
import { City } from "@/lib/api";

export default function Cities({ 
  cities, 
  onCityClick 
}: { 
  cities: City[]; 
  onCityClick: (name: string) => void 
}) {
  return (
    <section id="cities" className="py-32 px-8 md:px-16 lg:px-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <FadeIn delay={200}>
            <div className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#807e83] mb-6">
              Strategic Regional Clusters
            </div>
          </FadeIn>
          <AnimatedHeading 
            text="Urban Intelligence Network."
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-10"
            style={{ color: 'var(--text)' }}
          />
          <FadeIn delay={800}>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light" style={{ color: 'var(--text-dim)' }}>
              Deep-dive into the commercial and academic data points driving the growth of South India's key economic engines.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {cities.map((city, index) => (
            <FadeIn key={city.id} delay={400 + (index * 150)}>
              <TrailCard
                id={city.slug}
                title={city.name}
                location={city.slug.toUpperCase()}
                difficulty={city.tag || "Regional Cluster"}
                creators={city.description || "Active Node"}
                stats={[
                  { label: "Listings", value: String(city.count) },
                  { label: "Status", value: "Verified" },
                  { label: "Cluster", value: "A-Tier" }
                ]}
                imageUrl={`/images/cities/${city.slug}.jpg`}
                mapImageUrl="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-3JYNLpogg5zknunPABpdOpEjJmZN5R.png&w=320&q=75"
                ctaText="View Intelligence"
                onDirectionsClick={() => onCityClick(city.name)}
                className="w-full max-w-none"
              />
            </FadeIn>
          ))}
        </div>

        <div className="mt-32 pt-20 border-t border-black/5 flex flex-wrap justify-center gap-16 md:gap-32">
          {[
            { label: 'Verified Listings', val: '45,000+' },
            { label: 'Urban Clusters', val: String(cities.length).padStart(2, '0') },
            { label: 'Data Accuracy', val: '99.9%' }
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={1200 + (i * 100)}>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>{stat.val}</div>
                <div className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
