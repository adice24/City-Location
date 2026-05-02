import { cn } from "@/lib/utils";
import React, { useState } from "react";

export const Component = ({ children, className, color = "#FFF991" }: { children?: React.ReactNode, className?: string, color?: string }) => {
  return (
   <div className={cn("min-h-screen w-full relative bg-white overflow-hidden", className)}>
      {/* Soft Yellow Glow - Center */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, ${color} 0%, transparent 70%)
          `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
      
      {/* Soft Yellow Glow - Top Left */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, ${color} 0%, transparent 70%)
          `,
          opacity: 0.4,
          mixBlendMode: "multiply",
        }}
      />

      {/* Soft Yellow Glow - Top Right */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, ${color} 0%, transparent 70%)
          `,
          opacity: 0.4,
          mixBlendMode: "multiply",
        }}
      />

     {/* Your Content/Components */}
     <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
       {children}
     </div>
</div>
  );
};
