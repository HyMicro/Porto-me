"use client";

// npm install @phosphor-icons/react framer-motion
/**
 * Displays a responsive pull control whose slat animation swaps between moon and sun icons.
 * Controls Light and Dark mode for the website.
 * Position: Bottom-left for PC, Top-left for Mobile.
 */

import {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { Moon, Sun } from "@phosphor-icons/react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SLATS = 6;
const MAX_SIZE = 68; // tuned for floating toggle size
const MIN_SIZE = 44;

export default function BlindPullToggle() {
  const [toggleDark, setToggleDark] = useState(true);
  const [pageIsDark, setPageIsDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true
  );
  const [animating, setAnimating] = useState(false);
  const [size, setSize] = useState(MAX_SIZE);
  const sizeRef = useRef(MAX_SIZE);
  const [scope, animate] = useAnimate();

  useIsomorphicLayoutEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setPageIsDark(isDark);
    setToggleDark(isDark);

    const check = () => {
      const darkNow = document.documentElement.classList.contains("dark");
      setPageIsDark(darkNow);
      setToggleDark(darkNow);
    };

    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth || window.innerWidth;
      const h = el.offsetHeight || window.innerHeight;
      const s = Math.max(
        MIN_SIZE,
        Math.min(MAX_SIZE, Math.round(Math.min(w, h) * 0.2))
      );
      sizeRef.current = s;
      setSize(s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const iconSize = Math.round(size * 0.45);
  const radius = Math.round(size * 0.275);
  const cordRestH = Math.round(size * 0.3);
  const dotSize = Math.max(8, Math.round(size * 0.138));

  const buttonBg = pageIsDark
    ? "linear-gradient(145deg, #3a3530, #252019)"
    : "linear-gradient(145deg, #E8E4DC, #DFDBD4)";
  const buttonBorder = pageIsDark
    ? "1.5px solid rgba(255,255,255,0.18)"
    : "1.5px solid rgba(0,0,0,0.18)";
  const buttonShadow = pageIsDark
    ? "0 6px 28px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3)";
  const iconColor = pageIsDark ? "white" : "#2E2A24";
  const cordTop = pageIsDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)";
  const cordBottom = pageIsDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const dotBg = pageIsDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.5)";
  const dotShadow = pageIsDark
    ? "0 2px 8px rgba(0,0,0,0.5)"
    : "0 2px 6px rgba(0,0,0,0.12)";

  const handleToggle = useCallback(async () => {
    if (animating) return;
    setAnimating(true);

    const pullH = Math.round(sizeRef.current * 0.65);
    const restH = Math.round(sizeRef.current * 0.3);

    await animate(
      ".cord-line",
      { height: pullH },
      { duration: 0.1, ease: [0.4, 0, 1, 1] }
    );
    animate(
      ".cord-line",
      { height: restH },
      { type: "spring", stiffness: 300, damping: 18 }
    );
    await animate(
      ".slat",
      { scaleY: 0 },
      { delay: stagger(0.04), duration: 0.1, ease: "easeIn" }
    );

    // Toggle theme on root element
    const nextDark = !pageIsDark;
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setToggleDark(nextDark);
    setPageIsDark(nextDark);

    await animate(
      ".slat",
      { scaleY: 1 },
      { delay: stagger(0.04), duration: 0.13, ease: "easeOut" }
    );

    setAnimating(false);
  }, [animating, animate, pageIsDark]);

  return (
    <div
      ref={scope}
      className="fixed top-3 left-4 sm:top-auto sm:bottom-6 sm:left-6 z-50 flex items-center justify-center pointer-events-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex select-none flex-col items-center drop-shadow-xl"
      >
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          aria-label="Toggle Light and Dark Mode"
          style={{
            width: size,
            height: size,
            borderRadius: radius,
            border: buttonBorder,
            boxShadow: buttonShadow,
            cursor: "pointer",
            position: "relative",
            background: "transparent",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: radius - 1,
              overflow: "hidden",
            }}
          >
            {Array.from({ length: SLATS }).map((_, i) => {
              const topPx = Math.round((i / SLATS) * size);
              const nextTopPx =
                i === SLATS - 1 ? size : Math.round(((i + 1) / SLATS) * size);
              const heightPx = nextTopPx - topPx;

              return (
                <div
                  key={i}
                  className="slat"
                  style={{
                    position: "absolute",
                    top: topPx,
                    left: 0,
                    width: "100%",
                    height: heightPx,
                    overflow: "hidden",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -topPx,
                      left: 0,
                      width: size,
                      height: size,
                      background: buttonBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: iconColor,
                    }}
                  >
                    {toggleDark ? (
                      <Moon size={iconSize} weight="regular" />
                    ) : (
                      <Sun size={iconSize} weight="regular" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.button>

        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={handleToggle}
        >
          <div
            className="cord-line"
            style={{
              width: 2,
              height: cordRestH,
              background: `linear-gradient(to bottom, ${cordTop}, ${cordBottom})`,
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              background: dotBg,
              boxShadow: dotShadow,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
