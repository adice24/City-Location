import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "../styles/globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "CityData — Midnight Plum Intelligence",
  description: "Premium urban intelligence platform with real-time data visualization.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`
      ${plex.variable} 
      font-plex
    `}>
      <body 
        suppressHydrationWarning
        style={{ 
          fontFamily: 'var(--font-plex), sans-serif',
          // Mapping all legacy font variables to IBM Plex Sans to ensure all components update
          ['--font-body' as any]: 'var(--font-plex)',
          ['--font-display' as any]: 'var(--font-plex)',
          ['--font-inter' as any]: 'var(--font-plex)',
          ['--font-heading' as any]: 'var(--font-plex)',
          ['--font-schibsted' as any]: 'var(--font-plex)',
          ['--font-noto' as any]: 'var(--font-plex)',
          ['--font-fustat' as any]: 'var(--font-plex)',
        }}
      >
        {children}

        {/* Grain Overlay */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          pointerEvents: 'none', opacity: 0.4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
        }} />

        {/* Subtle Scanline */}
        <div style={{
          position: 'fixed', left: 0, right: 0,
          height: '1px',
          background: 'rgba(0,0,0,0.02)',
          zIndex: 99998,
          pointerEvents: 'none',
          animation: 'scanline 12s linear infinite',
          willChange: 'transform',
        }} />
      </body>
    </html>
  );
}
