"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, useMemo } from "react";

export interface ElectricGazeParams {
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
  charSet?: string;
  customChars?: string;
  brightness?: number;
  contrast?: number;
  edgeEmphasis?: number;
  density?: number;
  toneCurve?: Array<{ x: number; y: number }>;
  tint?: string;
  tintOpacity?: number;
  overlayBlend?: GlobalCompositeOperation;
  saturation?: number;
  grayscale?: number;
  blurType?: "off" | "gaussian" | "motion" | "radial" | "tilt";
  blurAmount?: number;
  blurAngle?: number;
  directionalBothSides?: boolean;
  tiltFocus?: number;
  tiltPosition?: number;
  tiltFeather?: number;
  lensFocus?: number;
  blurCenterX?: number;
  blurCenterY?: number;
  progressivePosition?: number;
  progressiveReverse?: boolean;
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
  animStyle?: "shimmer" | "wave" | "pulse" | "ripple" | "flicker";
  animSpeed?: { enabled: boolean; intensity: number };
  animIntensity?: { enabled: boolean; intensity: number };
  lights?: {
    enabled: boolean;
    points: Array<{ x: number; y: number; radius: number; intensity: number; color?: string }>;
  };
  mask?: {
    enabled: boolean;
    tool?: string;
    brushSize?: number;
    showOverlay?: boolean;
    invert?: boolean;
    dataUrl?: string | null;
    shapes?: any[];
  };
}

export const DEFAULT_ELECTRIC_GAZE_PARAMS: Required<ElectricGazeParams> = {
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
  toneCurve: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  tint: "#3ca6ff",
  tintOpacity: 0,
  overlayBlend: "multiply",
  saturation: 100,
  grayscale: 0,
  blurType: "off",
  blurAmount: 35,
  blurAngle: 0,
  directionalBothSides: false,
  tiltFocus: 35,
  tiltPosition: 50,
  tiltFeather: 15,
  lensFocus: 40,
  blurCenterX: 50,
  blurCenterY: 50,
  progressivePosition: 55,
  progressiveReverse: false,
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
  lights: {
    enabled: false,
    points: [],
  },
  mask: {
    enabled: false,
    tool: "freehand",
    brushSize: 30,
    showOverlay: false,
    invert: false,
    dataUrl: null,
    shapes: [],
  },
};

// 4x4 Bayer Dither Matrix
const BAYER_4X4 = [
  [0 / 16, 8 / 16, 2 / 16, 10 / 16],
  [12 / 16, 4 / 16, 14 / 16, 6 / 16],
  [3 / 16, 11 / 16, 1 / 16, 9 / 16],
  [15 / 16, 7 / 16, 13 / 16, 5 / 16],
];

const CHARACTER_SETS: Record<string, string> = {
  standard: " .:-=+*#%@",
  minimal: " .:+*",
  blocks: " ░▒▓█",
  matrix: " 01010101",
  cyber: " .:=+*#%@█▓▒░",
  digits: " 0123456789",
  slashes: " /\\|/-",
};

interface ElectricGazeCanvasProps {
  imageSrc: string;
  params?: Partial<ElectricGazeParams>;
  className?: string;
  interactiveLight?: boolean;
  targetFPS?: number;
}

export interface ElectricGazeRef {
  getCanvas: () => HTMLCanvasElement | null;
}

export const ElectricGazeCanvas = forwardRef<ElectricGazeRef, ElectricGazeCanvasProps>(
  ({ imageSrc, params = {}, className = "", interactiveLight = true, targetFPS = 40 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0.5, y: 0.5, active: false });
    const isVisibleRef = useRef<boolean>(true);

    // Merge parameters with defaults
    const config = useMemo(() => {
      return {
        ...DEFAULT_ELECTRIC_GAZE_PARAMS,
        ...params,
        pfx: {
          ...DEFAULT_ELECTRIC_GAZE_PARAMS.pfx,
          ...(params.pfx || {}),
        },
        animSpeed: {
          ...DEFAULT_ELECTRIC_GAZE_PARAMS.animSpeed,
          ...(params.animSpeed || {}),
        },
        animIntensity: {
          ...DEFAULT_ELECTRIC_GAZE_PARAMS.animIntensity,
          ...(params.animIntensity || {}),
        },
        lights: {
          ...DEFAULT_ELECTRIC_GAZE_PARAMS.lights,
          ...(params.lights || {}),
        },
        mask: {
          ...DEFAULT_ELECTRIC_GAZE_PARAMS.mask,
          ...(params.mask || {}),
        },
      } as Required<ElectricGazeParams>;
    }, [params]);

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
    }));

    // Preload & cache image
    useEffect(() => {
      let isMounted = true;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;
      img.onload = () => {
        if (isMounted) {
          imgRef.current = img;
          setIsLoaded(true);
        }
      };
      return () => {
        isMounted = false;
      };
    }, [imageSrc]);

    // IntersectionObserver to PAUSE animation loop when element is out of screen (0 CPU usage when scrolled down!)
    useEffect(() => {
      if (!containerRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting;
          });
        },
        { threshold: 0.05 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    // Handle Resize with max resolution capping for ultra performance
    useEffect(() => {
      if (!containerRef.current || !canvasRef.current) return;

      const updateDimensions = () => {
        if (!containerRef.current || !canvasRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Cap max canvas rendering resolution to 1280px for fast GPU rasterization
        const maxDim = 1280;
        let w = Math.floor(rect.width) || 600;
        let h = Math.floor(rect.height) || 750;

        if (w > maxDim || h > maxDim) {
          const scale = maxDim / Math.max(w, h);
          w = Math.floor(w * scale);
          h = Math.floor(h * scale);
        }

        if (canvasRef.current.width !== w || canvasRef.current.height !== h) {
          canvasRef.current.width = w;
          canvasRef.current.height = h;
        }
      };

      updateDimensions();
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!interactiveLight || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mousePosRef.current = { x, y, active: true };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    // Main Render Loop (Ultra Optimized with Downsampled Offscreen Sampling Grid & FPS Throttling)
    useEffect(() => {
      if (!isLoaded || !imgRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const img = imgRef.current;

      // Small offscreen canvas sized to grid dimensions for lightning fast sampling
      const gridCanvas = document.createElement("canvas");
      const gridCtx = gridCanvas.getContext("2d", { willReadFrequently: true });

      let startTime = performance.now();
      let lastFrameTime = 0;
      const frameInterval = 1000 / targetFPS; // Target FPS capping (e.g. 40 FPS = 25ms per frame)

      const render = (timestamp: number) => {
        // Skip frame if not visible or throttled by target FPS
        if (!isVisibleRef.current) {
          animFrameRef.current = requestAnimationFrame(render);
          return;
        }

        const elapsed = timestamp - lastFrameTime;
        if (elapsed < frameInterval) {
          animFrameRef.current = requestAnimationFrame(render);
          return;
        }
        lastFrameTime = timestamp - (elapsed % frameInterval);

        const time = (timestamp - startTime) / 1000;
        const width = canvas.width;
        const height = canvas.height;

        if (width === 0 || height === 0) return;

        const cellSize = Math.max(4, Math.floor(config.cellSize));
        const cols = Math.ceil(width / cellSize);
        const rows = Math.ceil(height / cellSize);

        // Resize downsampled grid canvas to cols x rows (80x faster pixel read than full resolution!)
        if (gridCanvas.width !== cols || gridCanvas.height !== rows) {
          gridCanvas.width = cols;
          gridCanvas.height = rows;
        }

        if (gridCtx) {
          gridCtx.clearRect(0, 0, cols, rows);

          // Draw image aspect fill into grid canvas
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = width / height;
          let drawW = cols;
          let drawH = rows;
          let drawX = 0;
          let drawY = 0;

          if (imgAspect > canvasAspect) {
            drawW = rows * imgAspect;
            drawX = (cols - drawW) / 2;
          } else {
            drawH = cols / imgAspect;
            drawY = (rows - drawH) / 2;
          }

          gridCtx.drawImage(img, drawX, drawY, drawW, drawH);
        }

        // STEP 1: Clear canvas & Background Mode
        ctx.save();
        ctx.clearRect(0, 0, width, height);

        if (config.bgMode === "solid") {
          ctx.fillStyle = config.tint || "#050508";
          ctx.fillRect(0, 0, width, height);
        }

        // Fetch compact ImageData (cols * rows pixels)
        const gridData = gridCtx ? gridCtx.getImageData(0, 0, cols, rows) : null;
        if (!gridData) {
          ctx.restore();
          return;
        }

        const data = gridData.data;
        const speedMult = config.animSpeed.enabled ? config.animSpeed.intensity / 50 : 1;
        const animTime = time * speedMult;
        const animAmp = config.animIntensity.enabled ? config.animIntensity.intensity / 100 : 0.6;

        const rawContrast = config.contrast;
        const contrastFactor = (259 * (rawContrast + 255)) / (255 * (259 - rawContrast || 1));
        let chars = config.customChars || CHARACTER_SETS[config.charSet] || CHARACTER_SETS.standard;

        ctx.globalCompositeOperation = config.styleBlend || "source-over";

        // STEP 2 & 3: Direct 1-to-1 Grid Loop
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (config.coverage < 100 && (Math.sin(r * 12.9898 + c * 78.233) * 43758.5453) % 1 > config.coverage / 100) {
              continue;
            }

            const idx = (r * cols + c) * 4;
            let avgR = data[idx];
            let avgG = data[idx + 1];
            let avgB = data[idx + 2];

            if (config.brightness !== 0) {
              avgR = Math.min(255, Math.max(0, avgR + config.brightness * 2.55));
              avgG = Math.min(255, Math.max(0, avgG + config.brightness * 2.55));
              avgB = Math.min(255, Math.max(0, avgB + config.brightness * 2.55));
            }

            avgR = Math.min(255, Math.max(0, contrastFactor * (avgR - 128) + 128));
            avgG = Math.min(255, Math.max(0, contrastFactor * (avgG - 128) + 128));
            avgB = Math.min(255, Math.max(0, contrastFactor * (avgB - 128) + 128));

            let lum = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB) / 255;

            if (config.grayscale > 0) {
              const grayR = lum * 255;
              const grayFactor = config.grayscale / 100;
              avgR = avgR * (1 - grayFactor) + grayR * grayFactor;
              avgG = avgG * (1 - grayFactor) + grayR * grayFactor;
              avgB = avgB * (1 - grayFactor) + grayR * grayFactor;
            }

            if (config.invert) {
              lum = 1.0 - lum;
              avgR = 255 - avgR;
              avgG = 255 - avgG;
              avgB = 255 - avgB;
            }

            let animMod = 0;
            if (config.animated) {
              const normX = c / cols;
              const normY = r / rows;

              switch (config.animStyle) {
                case "shimmer":
                  animMod = Math.sin(animTime * 3 + (normX + normY) * 8) * 0.25 * animAmp;
                  break;
                case "wave":
                  animMod = Math.sin(animTime * 2.5 + normY * 10) * 0.3 * animAmp;
                  break;
                case "pulse":
                  animMod = (Math.sin(animTime * 4) * 0.5 + 0.5) * 0.2 * animAmp;
                  break;
                case "ripple":
                  const dist = Math.hypot(normX - 0.5, normY - 0.5);
                  animMod = Math.sin(animTime * 4 - dist * 12) * 0.3 * animAmp;
                  break;
                case "flicker":
                  animMod = (Math.random() - 0.5) * 0.3 * animAmp;
                  break;
              }
            }

            const activeLum = Math.min(1.0, Math.max(0.0, lum + animMod));
            const colorStr = `rgb(${Math.round(avgR)}, ${Math.round(avgG)}, ${Math.round(avgB)})`;
            const cellX = c * cellSize;
            const cellY = r * cellSize;

            ctx.fillStyle = colorStr;
            ctx.strokeStyle = colorStr;

            const mode = config.renderMode;

            if (mode === "characters") {
              const charIdx = Math.floor(activeLum * (chars.length - 1));
              const char = chars[charIdx] || " ";
              ctx.font = `bold ${cellSize * 1.1}px monospace`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(char, cellX + cellSize / 2, cellY + cellSize / 2);
            } else if (mode === "dither") {
              const bayerValue = BAYER_4X4[r % 4][c % 4];
              if (activeLum > bayerValue) {
                const radius = (cellSize / 2) * (activeLum * 1.1);
                ctx.beginPath();
                ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, Math.max(1, radius), 0, Math.PI * 2);
                ctx.fill();
              }
            } else if (mode === "dots" || mode === "bubbles") {
              const radius = (cellSize / 2) * (activeLum * (mode === "bubbles" ? 1.4 : 1.0));
              ctx.beginPath();
              ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, Math.max(1, radius), 0, Math.PI * 2);
              if (mode === "bubbles") {
                ctx.lineWidth = 1;
                ctx.stroke();
              } else {
                ctx.fill();
              }
            } else if (mode === "cross") {
              const size = (cellSize / 2) * activeLum;
              const cx = cellX + cellSize / 2;
              const cy = cellY + cellSize / 2;
              ctx.lineWidth = Math.max(1, cellSize * 0.2 * activeLum);
              ctx.beginPath();
              ctx.moveTo(cx - size, cy);
              ctx.lineTo(cx + size, cy);
              ctx.moveTo(cx, cy - size);
              ctx.lineTo(cx, cy + size);
              ctx.stroke();
            } else if (mode === "diamond") {
              const size = (cellSize / 2) * activeLum;
              const cx = cellX + cellSize / 2;
              const cy = cellY + cellSize / 2;
              ctx.beginPath();
              ctx.moveTo(cx, cy - size);
              ctx.lineTo(cx + size, cy);
              ctx.lineTo(cx, cy + size);
              ctx.lineTo(cx - size, cy);
              ctx.closePath();
              ctx.fill();
            } else if (mode === "matrix") {
              const matrixChars = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ";
              const mIdx = Math.floor((activeLum + (r * 0.1 + animTime)) % 1 * matrixChars.length);
              ctx.font = `bold ${cellSize}px monospace`;
              ctx.fillStyle = activeLum > 0.7 ? "#ffffff" : `rgba(0, ${Math.floor(activeLum * 255)}, 120, ${activeLum})`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(matrixChars[mIdx], cellX + cellSize / 2, cellY + cellSize / 2);
            } else if (mode === "hexdump") {
              const hexVal = Math.floor(activeLum * 15).toString(16).toUpperCase();
              ctx.font = `${cellSize * 0.9}px monospace`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(hexVal, cellX + cellSize / 2, cellY + cellSize / 2);
            } else if (mode === "lines" || mode === "hatch") {
              ctx.lineWidth = Math.max(1, cellSize * 0.25 * activeLum);
              ctx.beginPath();
              ctx.moveTo(cellX, cellY + cellSize);
              ctx.lineTo(cellX + cellSize, cellY);
              if (mode === "hatch" && activeLum > 0.5) {
                ctx.moveTo(cellX, cellY);
                ctx.lineTo(cellX + cellSize, cellY + cellSize);
              }
              ctx.stroke();
            } else {
              const drawW = Math.max(1, cellSize * (mode === "pixel" ? 1 : activeLum * 1.05));
              const drawH = Math.max(1, cellSize * (mode === "pixel" ? 1 : activeLum * 1.05));
              const drawX = cellX + (cellSize - drawW) / 2;
              const drawY = cellY + (cellSize - drawH) / 2;
              ctx.fillRect(drawX, drawY, drawW, drawH);
            }
          }
        }

        // STEP 4: Tint Overlay
        if (config.tintOpacity > 0 && config.tint) {
          ctx.save();
          ctx.globalCompositeOperation = config.overlayBlend || "multiply";
          ctx.globalAlpha = config.tintOpacity / 100;
          ctx.fillStyle = config.tint;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }

        // STEP 5: Fast Post-Processing (PFX)
        const pfx = config.pfx;

        if (pfx.vignette?.enabled) {
          const vigIntensity = (pfx.vignette.intensity / 100) * 0.85;
          const radGrad = ctx.createRadialGradient(
            width / 2,
            height / 2,
            Math.min(width, height) * 0.2,
            width / 2,
            height / 2,
            Math.max(width, height) * 0.7
          );
          radGrad.addColorStop(0, "rgba(0,0,0,0)");
          radGrad.addColorStop(1, `rgba(0,0,0,${vigIntensity})`);
          ctx.fillStyle = radGrad;
          ctx.fillRect(0, 0, width, height);
        }

        if (pfx.scanLines?.enabled) {
          const scanAlpha = (pfx.scanLines.intensity / 100) * 0.35;
          ctx.fillStyle = `rgba(0, 0, 0, ${scanAlpha})`;
          for (let y = 0; y < height; y += 6) {
            ctx.fillRect(0, y, width, 2);
          }
        }

        if (pfx.bloom?.enabled) {
          const bloomAlpha = (pfx.bloom.intensity / 100) * 0.25;
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = bloomAlpha;
          ctx.filter = "blur(8px)";
          ctx.drawImage(canvas, 0, 0);
          ctx.restore();
        }

        // STEP 6: Interactive Light Glow
        if (config.lights.enabled || (interactiveLight && mousePosRef.current.active)) {
          const points = [...(config.lights.points || [])];
          if (interactiveLight && mousePosRef.current.active) {
            points.push({
              x: mousePosRef.current.x,
              y: mousePosRef.current.y,
              radius: 0.35,
              intensity: 0.75,
              color: config.tint || "#3ca6ff",
            });
          }

          ctx.save();
          ctx.globalCompositeOperation = "screen";
          points.forEach((pt) => {
            const px = pt.x * width;
            const py = pt.y * height;
            const radius = pt.radius * Math.max(width, height);
            const lightGrad = ctx.createRadialGradient(px, py, 0, px, py, radius);
            let lightColor = pt.color || config.tint || "#3ca6ff";
            if (typeof lightColor === "string" && lightColor.startsWith("#") && lightColor.length > 7) {
              lightColor = lightColor.slice(0, 7);
            }
            try {
              lightGrad.addColorStop(0, lightColor);
              lightGrad.addColorStop(1, "transparent");
            } catch {
              lightGrad.addColorStop(0, "#ffffff");
              lightGrad.addColorStop(1, "transparent");
            }
            ctx.globalAlpha = pt.intensity || 0.6;
            ctx.fillStyle = lightGrad;
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.restore();
        }

        ctx.restore();

        if (config.animated) {
          animFrameRef.current = requestAnimationFrame(render);
        }
      };

      animFrameRef.current = requestAnimationFrame(render);

      return () => {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
      };
    }, [isLoaded, config, interactiveLight, targetFPS]);

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full min-h-[300px] overflow-hidden flex items-center justify-center ${className}`}
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-zinc-950 animate-pulse flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Initializing Electric Gaze Engine...
            </span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full object-cover cursor-crosshair transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      </div>
    );
  }
);

ElectricGazeCanvas.displayName = "ElectricGazeCanvas";
