"use client";

import { useState } from "react";
import Image from "next/image";
import { Sliders, Eye } from "lucide-react";
import { Hero12 } from "@/components/ui/hero-12";
import { ElectricGazeCanvas, ElectricGazeParams } from "@/components/ui/electric-gaze-canvas";

// Preset configurations for interactive mode switching
const PRESETS: Record<string, { label: string; params: Partial<ElectricGazeParams> }> = {
  electricDither: {
    label: "Electric Dither",
    params: {
      renderMode: "dither",
      bgMode: "none",
      bgBlur: 12,
      bgOpacity: 90,
      cellSize: 9,
      coverage: 100,
      invert: false,
      styleBlend: "source-over",
      charSet: "standard",
      customChars: "",
      brightness: 0,
      contrast: 158,
      edgeEmphasis: 0,
      density: 20,
      tint: "#38bdf8",
      tintOpacity: 0,
      overlayBlend: "multiply",
      saturation: 100,
      grayscale: 0,
      blurType: "off",
      blurAmount: 35,
      pfx: {
        vignette: { enabled: false, intensity: 38 },
        scanLines: { enabled: false, intensity: 40 },
        chromatic: { enabled: false, intensity: 15 },
        bloom: { enabled: false, intensity: 25 },
        filmGrain: { enabled: false, intensity: 30 },
        glitch: { enabled: false, intensity: 20 },
        pixelate: { enabled: false, intensity: 15 },
        halftone: { enabled: false, intensity: 20 },
        filmDust: { enabled: false, intensity: 20 },
      },
      animated: true,
      animStyle: "shimmer",
      animSpeed: { enabled: true, intensity: 100 },
      animIntensity: { enabled: true, intensity: 60 },
      lights: { enabled: false, points: [] },
      mask: { enabled: false, tool: "freehand", brushSize: 30, showOverlay: false, invert: false, dataUrl: null, shapes: [] },
    },
  },
  asciiChars: {
    label: "ASCII Chars",
    params: {
      renderMode: "characters",
      cellSize: 10,
      charSet: "cyber",
      contrast: 170,
      brightness: 10,
      tint: "#38bdf8",
      tintOpacity: 15,
      pfx: {
        scanLines: { enabled: true, intensity: 25 },
        vignette: { enabled: true, intensity: 35 },
      },
      animated: true,
      animStyle: "shimmer",
    },
  },
  matrixRain: {
    label: "Matrix Code",
    params: {
      renderMode: "matrix",
      cellSize: 11,
      contrast: 180,
      brightness: 5,
      tint: "#22c55e",
      tintOpacity: 25,
      overlayBlend: "screen",
      pfx: {
        bloom: { enabled: true, intensity: 40 },
        scanLines: { enabled: true, intensity: 35 },
      },
      animated: true,
      animStyle: "wave",
    },
  },
  cyberCross: {
    label: "Cross Hatch",
    params: {
      renderMode: "hatch",
      cellSize: 8,
      contrast: 160,
      edgeEmphasis: 25,
      tint: "#a855f7",
      tintOpacity: 20,
      pfx: {
        chromatic: { enabled: true, intensity: 25 },
        filmGrain: { enabled: true, intensity: 40 },
      },
      animated: true,
      animStyle: "flicker",
    },
  },
};

export function HeroSection() {
  const [activePreset, setActivePreset] = useState<string>("electricDither");
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  return (
    <div id="hero" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* 1. Full-Bleed Electric Gaze Canvas Background Layer featuring menew.jpeg */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {!showOriginal ? (
          <ElectricGazeCanvas
            imageSrc="/menew.jpeg"
            params={PRESETS[activePreset]?.params}
            className="w-full h-full object-cover opacity-80 transition-opacity duration-700 pointer-events-auto"
            interactiveLight={true}
          />
        ) : (
          <Image
            src="/menew.jpeg"
            alt="Ahyad Izzuddin Syuhaiba"
            fill
            priority
            className="object-cover object-center opacity-75 transition-opacity duration-700"
            sizes="100vw"
          />
        )}

        {/* Ambient Radial & Vignette Overlays for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_95%)] pointer-events-none z-10" />
      </div>

      {/* 2. Hero12 Integrated Foreground Layout */}
      <div className="relative z-20 pt-20 sm:pt-24 flex-1 flex flex-col justify-between">
        <Hero12
          title="AHYAD IZZUDDIN SYUHAIBA"
          established="Game Dev • UI/UX • Graphic Design"
          description="Unreal Engine Gameplay Programmer, UI/UX Designer & Graphic Designer. Combining technical logic and creative design to engineer engaging interactive experiences."
          animation="subtle"
          variant="standard"
          titleClassName="font-neuton"
          primaryCTA={{
            ctaEnabled: true,
            text: "Get in Touch",
            link: "#contact",
            size: "default",
          }}
        />

        {/* Interactive Electric Gaze Engine Preset Selector Bar */}
        <div className="relative z-30 max-w-6xl mx-auto px-6 sm:px-10 pb-10 w-full flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.entries(PRESETS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => {
                  setActivePreset(key);
                  setShowOriginal(false);
                }}
                className={`px-3.5 py-1.5 text-[11px] font-mono rounded-full border transition-all duration-300 cursor-pointer ${activePreset === key && !showOriginal
                    ? "bg-zinc-900 border-white text-white shadow-[0_0_16px_rgba(255,255,255,0.4)] font-semibold"
                    : "bg-zinc-900/80 border-zinc-700/80 text-zinc-400 hover:text-white hover:border-zinc-500"
                  }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className={`px-3.5 py-1.5 text-[11px] font-mono rounded-full border flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${showOriginal
                ? "bg-white text-black border-white font-bold shadow-[0_0_16px_rgba(255,255,255,0.4)]"
                : "bg-zinc-900/80 border-zinc-700/80 text-zinc-400 hover:text-white hover:border-zinc-500"
                }`}
            >
              <Eye size={12} /> {showOriginal ? "Canvas On" : "Photo Only"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
