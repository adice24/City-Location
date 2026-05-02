"use client";
import React from "react";

export default function Ticker() {
  const data = [
    "• CHENNAI: 452 NEW LISTINGS",
    "• HYDERABAD: METRO DATA SYNCED",
    "• BANGALORE: TECH CLUSTER UPDATED",
    "• KOCHI: PORT LOGISTICS LIVE",
    "• SYSTEM: 99.9% UPTIME",
    "• ANALYTICS: GPT-4O ACTIVE"
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-black/60 backdrop-blur-md border-t border-white/5 flex items-center overflow-hidden z-50">
      <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite]">
        {[...data, ...data].map((item, i) => (
          <span key={i} className="text-[10px] font-bold tracking-[0.3em] text-white/30 px-16 uppercase">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
