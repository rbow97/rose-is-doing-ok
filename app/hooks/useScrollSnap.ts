import { useEffect, RefObject } from "react";
import { LAYOUT } from "../lib/constants/layout";

export function useScrollSnap(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = (event: WheelEvent) => {
      if (window.innerWidth < LAYOUT.BREAKPOINTS.MOBILE) return;

      event.preventDefault();
      const container = ref.current;
      if (!container) return;

      const delta =
        Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY), 50);
      const currentScroll = container.scrollTop;
      const direction = delta > 0 ? 1 : -1;

      container.scrollTo({
        top: currentScroll + direction * container.offsetHeight,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [ref]);
}
