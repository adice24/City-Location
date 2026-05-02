"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  initialDelay?: number;
  charDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedHeading({ text, initialDelay = 0.2, charDelay = 0.03, className = "", style = {} }: AnimatedHeadingProps) {
  const lines = text.split("\n");

  return (
    <div className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} style={{ display: 'block', overflow: 'hidden' }}>
          {line.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ 
                delay: initialDelay + (lineIndex * 0.2) + (charIndex * charDelay),
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              style={{ display: 'inline-block' }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

