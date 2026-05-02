"use client";
import React from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export default function GradientSphere() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
      pointerEvents: "none",
    }}>
      <ShaderGradientCanvas 
        style={{ width: "100%", height: "100%" }}
        pointerEvents="none"
        pixelDensity={1}
        fov={45}
      >
        <ShaderGradient
          animate="on"
          brightness={0.8}
          cAzimuthAngle={180}
          cDistance={0.5}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#FF5F1F"
          color2="#000000"
          color3="#ED9E59"
          envPreset="city"
          grain="on"
          lightType="env"
          positionX={0}
          positionY={0}
          positionZ={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          type="sphere"
          uAmplitude={2.0}
          uDensity={0.5}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={0.5}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
