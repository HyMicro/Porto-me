"use client";

import React, { useEffect, useRef } from "react";

declare const gsap: any;
declare const THREE: any;

export function LuminaInteractiveList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- DYNAMIC SCRIPT LOADING ---
    const loadScripts = async () => {
      const loadScript = (src: string, globalName: string) =>
        new Promise<void>((res, rej) => {
          if ((window as any)[globalName]) {
            res();
            return;
          }
          if (document.querySelector(`script[src="${src}"]`)) {
            const check = setInterval(() => {
              if ((window as any)[globalName]) {
                clearInterval(check);
                res();
              }
            }, 50);
            setTimeout(() => {
              clearInterval(check);
              rej(new Error(`Timeout waiting for ${globalName}`));
            }, 10000);
            return;
          }
          const s = document.createElement("script");
          s.src = src;
          s.onload = () => {
            setTimeout(() => res(), 100);
          };
          s.onerror = () => rej(new Error(`Failed to load ${src}`));
          document.head.appendChild(s);
        });

      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", "gsap");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "THREE");
        initApplication();
      } catch (e) {
        console.error("Failed to load base scripts:", e);
      }
    };

    const initApplication = async () => {
      const SLIDER_CONFIG: any = {
        settings: {
          transitionDuration: 2.5,
          autoSlideSpeed: 5000,
          currentEffect: "glass",
          currentEffectPreset: "Default",
          globalIntensity: 1.0,
          speedMultiplier: 1.0,
          distortionStrength: 1.0,
          colorEnhancement: 1.0,
          glassRefractionStrength: 1.0,
          glassChromaticAberration: 1.0,
          glassBubbleClarity: 1.0,
          glassEdgeGlow: 1.0,
          glassLiquidFlow: 1.0,
          frostIntensity: 1.5,
          frostCrystalSize: 1.0,
          frostIceCoverage: 1.0,
          frostTemperature: 1.0,
          frostTexture: 1.0,
          rippleFrequency: 25.0,
          rippleAmplitude: 0.08,
          rippleWaveSpeed: 1.0,
          rippleRippleCount: 1.0,
          rippleDecay: 1.0,
          plasmaIntensity: 1.2,
          plasmaSpeed: 0.8,
          plasmaEnergyIntensity: 0.4,
          plasmaContrastBoost: 0.3,
          plasmaTurbulence: 1.0,
          timeshiftDistortion: 1.6,
          timeshiftBlur: 1.5,
          timeshiftFlow: 1.4,
          timeshiftChromatic: 1.5,
          timeshiftTurbulence: 1.4,
        },
      };

      let currentSlideIndex = 0;
      let isTransitioning = false;
      let shaderMaterial: any, renderer: any, scene: any, camera: any;
      let slideTextures: any[] = [];
      let texturesLoaded = false;
      let autoSlideTimer: any = null;
      let progressAnimation: any = null;
      let sliderEnabled = false;

      const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
      const PROGRESS_UPDATE_INTERVAL = 50;
      const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

      const slides = [
        { title: "Ethereal Glow", description: "A soft, radiant light that illuminates the soul.", media: "https://assets.codepen.io/7558/orange-portrait-001.jpg" },
        { title: "Rose Mirage", description: "Lost in a desert of blooming dreams and endless horizons.", media: "https://assets.codepen.io/7558/orange-portrait-002.jpg" },
        { title: "Velvet Mystique", description: "Wrapped in the deep, luxurious embrace of the night.", media: "https://assets.codepen.io/7558/orange-portrait-003.jpg" },
        { title: "Golden Hour", description: "That fleeting moment when the world is dipped in gold.", media: "https://assets.codepen.io/7558/orange-portrait-004.jpg" },
      ];

      const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
      const fragmentShader = `
        uniform sampler2D uTexture1, uTexture2;
        uniform float uProgress;
        uniform vec2 uResolution, uTexture1Size, uTexture2Size;
        varying vec2 vUv;

        vec2 getCoverUV(vec2 uv, vec2 textureSize) {
          vec2 s = uResolution / textureSize;
          float scale = max(s.x, s.y);
          vec2 scaledSize = textureSize * scale;
          vec2 offset = (uResolution - scaledSize) * 0.5;
          return (uv * uResolution - offset) / scaledSize;
        }

        void main() {
          vec2 uv1 = getCoverUV(vUv, uTexture1Size);
          vec2 uv2 = getCoverUV(vUv, uTexture2Size);
          vec4 c1 = texture2D(uTexture1, uv1);
          vec4 c2 = texture2D(uTexture2, uv2);
          gl_FragColor = mix(c1, c2, uProgress);
        }
      `;

      const splitText = (text: string) => {
        return text
          .split("")
          .map((char) => `<span style="display: inline-block; opacity: 0;">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");
      };

      const updateContent = (idx: number) => {
        const titleEl = document.getElementById("mainTitle");
        const descEl = document.getElementById("mainDesc");
        if (titleEl && descEl && typeof gsap !== "undefined") {
          gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
          gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });

          setTimeout(() => {
            titleEl.innerHTML = splitText(slides[idx].title);
            descEl.textContent = slides[idx].description;

            gsap.set(titleEl.children, { opacity: 0, y: 20 });
            gsap.set(descEl, { y: 20, opacity: 0 });

            gsap.to(titleEl.children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
          }, 500);
        }
      };

      const navigateToSlide = (targetIndex: number) => {
        if (isTransitioning || targetIndex === currentSlideIndex) return;
        stopAutoSlideTimer();

        const currentTexture = slideTextures[currentSlideIndex];
        const targetTexture = slideTextures[targetIndex];
        if (!currentTexture || !targetTexture) return;

        isTransitioning = true;
        shaderMaterial.uniforms.uTexture1.value = currentTexture;
        shaderMaterial.uniforms.uTexture2.value = targetTexture;
        shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
        shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;

        updateContent(targetIndex);
        currentSlideIndex = targetIndex;

        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            shaderMaterial.uniforms.uProgress,
            { value: 0 },
            {
              value: 1,
              duration: TRANSITION_DURATION(),
              ease: "power2.inOut",
              onComplete: () => {
                shaderMaterial.uniforms.uProgress.value = 0;
                shaderMaterial.uniforms.uTexture1.value = targetTexture;
                shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
                isTransitioning = false;
                safeStartTimer(100);
              },
            }
          );
        }
      };

      const handleSlideChange = () => {
        if (isTransitioning || !texturesLoaded || !sliderEnabled) return;
        navigateToSlide((currentSlideIndex + 1) % slides.length);
      };

      const startAutoSlideTimer = () => {
        if (!texturesLoaded || !sliderEnabled) return;
        stopAutoSlideTimer();
        progressAnimation = setTimeout(() => {
          if (!isTransitioning) handleSlideChange();
        }, SLIDE_DURATION());
      };

      const stopAutoSlideTimer = () => {
        if (progressAnimation) clearTimeout(progressAnimation);
        if (autoSlideTimer) clearTimeout(autoSlideTimer);
        progressAnimation = null;
        autoSlideTimer = null;
      };

      const safeStartTimer = (delay = 0) => {
        stopAutoSlideTimer();
        if (sliderEnabled && texturesLoaded) {
          if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay);
          else startAutoSlideTimer();
        }
      };

      const loadImageTexture = (src: string) =>
        new Promise<any>((resolve, reject) => {
          if (typeof THREE === "undefined") {
            reject(new Error("THREE not loaded"));
            return;
          }
          const l = new THREE.TextureLoader();
          l.load(
            src,
            (t: any) => {
              t.minFilter = t.magFilter = THREE.LinearFilter;
              t.userData = { size: new THREE.Vector2(t.image.width || 800, t.image.height || 600) };
              resolve(t);
            },
            undefined,
            reject
          );
        });

      const initRenderer = async () => {
        const canvas = containerRef.current?.querySelector(".webgl-canvas") as HTMLCanvasElement;
        if (!canvas || typeof THREE === "undefined") return;

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
        renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || 500);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTexture1: { value: null },
            uTexture2: { value: null },
            uProgress: { value: 0 },
            uResolution: { value: new THREE.Vector2(canvas.clientWidth || window.innerWidth, canvas.clientHeight || 500) },
            uTexture1Size: { value: new THREE.Vector2(1, 1) },
            uTexture2Size: { value: new THREE.Vector2(1, 1) },
          },
          vertexShader,
          fragmentShader,
        });

        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

        for (const s of slides) {
          try {
            slideTextures.push(await loadImageTexture(s.media));
          } catch {
            console.warn("Failed texture:", s.media);
          }
        }

        if (slideTextures.length >= 2) {
          shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
          shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
          shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
          shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
          texturesLoaded = true;
          sliderEnabled = true;
          safeStartTimer(500);
        }

        const render = () => {
          requestAnimationFrame(render);
          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        };
        render();
      };

      initRenderer();
    };

    loadScripts();

    return () => {};
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-black" ref={containerRef}>
      <canvas className="webgl-canvas w-full h-full object-cover"></canvas>
      <div className="absolute bottom-8 left-8 z-10 text-white">
        <h1 className="text-3xl font-bold font-serif" id="mainTitle">
          Ethereal Glow
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-2" id="mainDesc">
          A soft, radiant light that illuminates the soul.
        </p>
      </div>
    </div>
  );
}

export const Component = LuminaInteractiveList;
export default LuminaInteractiveList;
