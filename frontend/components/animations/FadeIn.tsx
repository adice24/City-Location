"use client";
import React, { useEffect, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function FadeIn({ children, delay = 0, duration = 1000, className = "", style = {} }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
