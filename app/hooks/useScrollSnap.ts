import { useEffect, RefObject } from "react";
import { LAYOUT } from "../lib/constants/layout";

export function useScrollSnap(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      const isMobile = window.innerWidth < LAYOUT.BREAKPOINTS.MOBILE;
      const container = ref.current;
      if (!container) return;

      const delta =
        Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY), 50);
      const dimension = isMobile ? "offsetWidth" : "offsetHeight";
      const scrollProp = isMobile ? "scrollLeft" : "scrollTop";
      const currentScroll = container[scrollProp];
      const direction = delta > 0 ? 1 : -1;

      container.scrollTo({
        [isMobile ? "left" : "top"]:
          currentScroll + direction * container[dimension],
        behavior: "smooth",
      });
    };

    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!ref.current) return;
      const touchEnd = e.changedTouches[0].screenX;
      const direction = touchStart > touchEnd ? 1 : -1;

      ref.current.scrollTo({
        left: ref.current.scrollLeft + direction * ref.current.offsetWidth,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref]);
}
