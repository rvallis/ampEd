import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ZoomOrigin {
  /** percentage position (0-100) within the viewport to grow the portal from */
  xPercent: number;
  yPercent: number;
  color: string;
}

interface ZoomCtx {
  /** Grows a color portal from the given origin, calls onCovered once the
   * screen is fully covered (the right moment to swap route content), then
   * fades the portal away to reveal what's now underneath. */
  zoomInto: (origin: ZoomOrigin, onCovered: () => void) => void;
}

const Ctx = createContext<ZoomCtx | null>(null);

export function useZoomTransition() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useZoomTransition must be used within ZoomTransitionProvider");
  return ctx;
}

export function ZoomTransitionProvider({ children }: { children: ReactNode }) {
  const [portal, setPortal] = useState<
    (ZoomOrigin & { phase: "growing" | "covered" | "fading" }) | null
  >(null);
  const coveredRef = useRef<() => void>(() => {});

  const zoomInto = useCallback((origin: ZoomOrigin, onCovered: () => void) => {
    coveredRef.current = onCovered;
    setPortal({ ...origin, phase: "growing" });
  }, []);

  return (
    <Ctx.Provider value={{ zoomInto }}>
      {children}
      <AnimatePresence>
        {portal && (
          <motion.div
            key="zoom-portal"
            aria-hidden
            className="fixed z-50 rounded-full pointer-events-none"
            style={{
              left: `${portal.xPercent}%`,
              top: `${portal.yPercent}%`,
              width: "8vmax",
              height: "8vmax",
              background: portal.color,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={
              portal.phase === "fading"
                ? { scale: 34, opacity: 0 }
                : { scale: 34, opacity: 1 }
            }
            transition={
              portal.phase === "fading"
                ? { duration: 0.45, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0.5, ease: [0.7, 0, 0.84, 0] }
            }
            onAnimationComplete={() => {
              if (portal.phase === "growing") {
                coveredRef.current();
                setPortal((p) => (p ? { ...p, phase: "covered" } : p));
                // give React one tick to mount the new route content
                // underneath before fading the portal away
                requestAnimationFrame(() =>
                  requestAnimationFrame(() =>
                    setPortal((p) => (p ? { ...p, phase: "fading" } : p))
                  )
                );
              } else if (portal.phase === "fading") {
                setPortal(null);
              }
            }}
          />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
