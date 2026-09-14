"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";

export interface AsciiConfig {
  renderMode?:
    | "dither"
    | "characters"
    | "mosaic"
    | "pixel"
    | "dots"
    | "cross"
    | "diamond"
    | "voxel"
    | "lego"
    | "mixed"
    | "lines"
    | "diagonal"
    | "braille"
    | "disco"
    | "hexdump"
    | "matrix"
    | "rings"
    | "hearts"
    | "stars"
    | "hexagons"
    | "triangles"
    | "bubbles"
    | "hatch"
    | "contour"
    | "halfblocks";
  bgMode?: "none" | "blur" | "solid" | "photo";
  bgBlur?: number;
  bgOpacity?: number;
  cellSize?: number;
  coverage?: number;
  invert?: boolean;
  styleBlend?: GlobalCompositeOperation;
  charSet?: "standard" | "dense" | "minimal" | "binary" | "custom";
  customChars?: string;
  brightness?: number;
  contrast?: number;
  edgeEmphasis?: number;
  density?: number;
  tint?: string;
  tintOpacity?: number;
  overlayBlend?: GlobalCompositeOperation;
  saturation?: number;
  grayscale?: number;
  blurType?: "off" | "gaussian" | "directional" | "tilt" | "lens" | "progressive";
  blurAmount?: number;
  pfx?: {
    vignette?: { enabled: boolean; intensity: number };
    scanLines?: { enabled: boolean; intensity: number };
    chromatic?: { enabled: boolean; intensity: number };
    bloom?: { enabled: boolean; intensity: number };
    filmGrain?: { enabled: boolean; intensity: number };
    glitch?: { enabled: boolean; intensity: number };
    pixelate?: { enabled: boolean; intensity: number };
    halftone?: { enabled: boolean; intensity: number };
    filmDust?: { enabled: boolean; intensity: number };
  };
  animated?: boolean;
  animStyle?: "pulse" | "wave" | "shimmer" | "ripple" | "flicker";
  animSpeed?: { enabled: boolean; intensity: number };
  animIntensity?: { enabled: boolean; intensity: number };
}

export const DEFAULT_ASCII_CONFIG: AsciiConfig = {
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
  tint: "#3ca6ff",
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
  animStyle: "pulse",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 },
};

const CHAR_SETS: Record<string, string> = {
  standard: " .:-=+*#%@",
  dense: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  minimal: " .:+*#",
  binary: " 01",
  custom: " .:-=+*#%@",
};

interface AsciiArtCanvasProps {
  imageSrc: string;
  config?: Partial<AsciiConfig>;
  className?: string;
  opacity?: number;
}

export function AsciiArtCanvas({
  imageSrc,
  config = {},
  className = "",
  opacity = 1,
}: AsciiArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const mergedConfig = useMemo(() => ({
    ...DEFAULT_ASCII_CONFIG,
    ...config,
    pfx: { ...DEFAULT_ASCII_CONFIG.pfx, ...config.pfx },
    animSpeed: { ...DEFAULT_ASCII_CONFIG.animSpeed, ...config.animSpeed },
    animIntensity: { ...DEFAULT_ASCII_CONFIG.animIntensity, ...config.animIntensity },
  }), [config]);

  // Load source image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
  }, [imageSrc]);

  // Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded || !imageRef.current) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    // Offscreen canvas for fast pixel sampling
    const offscreenCanvas = document.createElement("canvas");
    const offCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(rect.width || window.innerWidth);
      const height = Math.floor(rect.height || window.innerHeight);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = (currentTime: number) => {
      const img = imageRef.current;
      if (!img || !canvas || !ctx) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (width <= 0 || height <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (currentTime - startTime) / 1000;

      // 1. Draw source photo scaled to fit/cover in offscreen buffer
      offCtx.clearRect(0, 0, width, height);

      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;
      let drawW = width;
      let drawH = height;
      let drawX = 0;
      let drawY = 0;

      if (canvasAspect > imgAspect) {
        drawW = width;
        drawH = width / imgAspect;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgAspect;
        drawX = (width - drawW) / 2;
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);

      // Extract pixel data for grid sampling
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Clear main canvas
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Handle Background Mode
      if (mergedConfig.bgMode === "blur") {
        ctx.save();
        ctx.filter = `blur(${mergedConfig.bgBlur ?? 12}px)`;
        ctx.globalAlpha = (mergedConfig.bgOpacity ?? 90) / 100;
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.restore();
      } else if (mergedConfig.bgMode === "photo") {
        ctx.save();
        ctx.globalAlpha = (mergedConfig.bgOpacity ?? 90) / 100;
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.restore();
      }

      // 2. Grid Subdivision & Cell Sampling
      const cellSize = Math.max(4, mergedConfig.cellSize || 9);
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      const contrastFactor = (259 * ((mergedConfig.contrast ?? 158) + 255)) / (255 * (259 - (mergedConfig.contrast ?? 158)));
      const brightness = mergedConfig.brightness ?? 0;
      const invert = mergedConfig.invert ?? false;

      // Animation parameters
      const animSpeedVal = (mergedConfig.animSpeed?.intensity ?? 100) / 100;
      const animIntensityVal = (mergedConfig.animIntensity?.intensity ?? 60) / 100;
      const isAnimated = mergedConfig.animated;

      const charString =
        mergedConfig.customChars ||
        CHAR_SETS[mergedConfig.charSet || "standard"] ||
        CHAR_SETS.standard;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${Math.floor(cellSize * 1.1)}px monospace`;

      const renderMode = mergedConfig.renderMode || "dither";

      // 3. Render grid cells
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize;
          const y = r * cellSize;

          // Sample average color of cell
          let rSum = 0, gSum = 0, bSum = 0, count = 0;
          const sampleStep = Math.max(1, Math.floor(cellSize / 3));

          for (let sy = 0; sy < cellSize; sy += sampleStep) {
            for (let sx = 0; sx < cellSize; sx += sampleStep) {
              const px = Math.min(width - 1, x + sx);
              const py = Math.min(height - 1, y + sy);
              const idx = (py * width + px) * 4;

              rSum += data[idx];
              gSum += data[idx + 1];
              bSum += data[idx + 2];
              count++;
            }
          }

          if (count === 0) continue;

          let red = rSum / count;
          let green = gSum / count;
          let blue = bSum / count;

          // 4. Color adjustments (Brightness & Contrast)
          red = contrastFactor * (red - 128) + 128 + brightness;
          green = contrastFactor * (green - 128) + 128 + brightness;
          blue = contrastFactor * (blue - 128) + 128 + brightness;

          red = Math.max(0, Math.min(255, red));
          green = Math.max(0, Math.min(255, green));
          blue = Math.max(0, Math.min(255, blue));

          // Luminance calculation
          let lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
          if (invert) lum = 1 - lum;

          // Animation modulation
          let animMod = 0;
          if (isAnimated) {
            const timePhase = elapsed * animSpeedVal * 2;
            if (mergedConfig.animStyle === "pulse") {
              animMod = Math.sin(timePhase + (c + r) * 0.15) * 0.12 * animIntensityVal;
            } else if (mergedConfig.animStyle === "wave") {
              animMod = Math.sin(timePhase + c * 0.3) * 0.15 * animIntensityVal;
            } else if (mergedConfig.animStyle === "shimmer") {
              animMod = Math.sin(timePhase * 2 + (c * 3 + r * 7)) * 0.1 * animIntensityVal;
            } else if (mergedConfig.animStyle === "ripple") {
              const dist = Math.hypot(c - cols / 2, r - rows / 2);
              animMod = Math.sin(timePhase * 2 - dist * 0.4) * 0.15 * animIntensityVal;
            } else if (mergedConfig.animStyle === "flicker") {
              animMod = (Math.random() - 0.5) * 0.2 * animIntensityVal;
            }
          }

          const activeLum = Math.max(0, Math.min(1, lum + animMod));

          // Skip low luminance if coverage threshold
          if (activeLum < 0.04) continue;

          const cx = x + cellSize / 2;
          const cy = y + cellSize / 2;

          // Monochrome / Grayscale tinting with optional color accent
          const alpha = activeLum * 0.95;
          const monoColor = Math.floor(activeLum * 255);

          ctx.fillStyle = `rgba(${monoColor}, ${monoColor}, ${monoColor}, ${alpha})`;

          // Draw per renderMode
          if (renderMode === "characters") {
            const charIdx = Math.floor(activeLum * (charString.length - 1));
            const char = charString[charIdx] || ".";
            ctx.fillText(char, cx, cy);
          } else if (renderMode === "dither") {
            // Ordered dither matrix 4x4
            const bayerMatrix = [
              [0, 8, 2, 10],
              [12, 4, 14, 6],
              [3, 11, 1, 9],
              [15, 7, 13, 5],
            ];
            const threshold = bayerMatrix[r % 4][c % 4] / 16;
            if (activeLum > threshold * 0.8) {
              const dotSize = Math.max(1, cellSize * (0.35 + activeLum * 0.55));
              ctx.beginPath();
              ctx.arc(cx, cy, dotSize / 2, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (renderMode === "dots" || renderMode === "bubbles") {
            const radius = (cellSize / 2) * activeLum * 0.9;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
          } else if (renderMode === "pixel" || renderMode === "mosaic") {
            const pSize = cellSize * activeLum;
            ctx.fillRect(cx - pSize / 2, cy - pSize / 2, pSize, pSize);
          } else if (renderMode === "cross") {
            const arm = (cellSize / 2) * activeLum;
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${monoColor}, ${monoColor}, ${monoColor}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(cx - arm, cy);
            ctx.lineTo(cx + arm, cy);
            ctx.moveTo(cx, cy - arm);
            ctx.lineTo(cx, cy + arm);
            ctx.stroke();
          } else if (renderMode === "diamond") {
            const rad = (cellSize / 2) * activeLum;
            ctx.beginPath();
            ctx.moveTo(cx, cy - rad);
            ctx.lineTo(cx + rad, cy);
            ctx.lineTo(cx, cy + rad);
            ctx.lineTo(cx - rad, cy);
            ctx.closePath();
            ctx.fill();
          } else if (renderMode === "matrix") {
            // Matrix code rain glyph
            const glyphs = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ";
            const gIdx = Math.floor(Math.random() * glyphs.length);
            ctx.fillStyle = `rgba(180, 255, 200, ${alpha})`;
            ctx.fillText(glyphs[gIdx], cx, cy);
          } else if (renderMode === "lines") {
            const lineLen = cellSize * activeLum * 0.9;
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${monoColor}, ${monoColor}, ${monoColor}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(cx - lineLen / 2, cy);
            ctx.lineTo(cx + lineLen / 2, cy);
            ctx.stroke();
          } else {
            // Fallback dot
            ctx.beginPath();
            ctx.arc(cx, cy, (cellSize / 2) * activeLum, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 5. Post-Effects (Vignette, ScanLines, FilmGrain)
      if (mergedConfig.pfx?.vignette?.enabled) {
        const vIntensity = (mergedConfig.pfx.vignette.intensity ?? 38) / 100;
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.3,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.75
        );
        grad.addColorStop(0, "rgba(0, 0, 0, 0)");
        grad.addColorStop(1, `rgba(0, 0, 0, ${vIntensity})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageLoaded, mergedConfig]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover pointer-events-none"
        style={{ opacity }}
        aria-hidden="true"
      />
    </div>
  );
}
