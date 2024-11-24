import { useEffect, RefObject } from "react";
import { LAYOUT } from "../lib/constants/layout";

export function useScrollSnap(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    let isScrolling = false;

    const handleScroll = (event: WheelEvent) => {
      if (window.innerWidth < LAYOUT.BREAKPOINTS.MOBILE) return;

      event.preventDefault();

      if (isScrolling) return;

      const container = ref.current;
      if (!container) return;

      isScrolling = true;

      const images = Array.from(container.children);
      const imagePositions = images.map(
        (img) => img.getBoundingClientRect().top + container.scrollTop
      );

      const currentScroll = container.scrollTop;
      const direction = event.deltaY > 0 ? 1 : -1;

      let nextPosition;
      if (direction > 0) {
        nextPosition =
          imagePositions.find((pos) => pos > currentScroll + 10) ??
          currentScroll;
      } else {
        nextPosition =
          [...imagePositions]
            .reverse()
            .find((pos) => pos < currentScroll - 10) ?? currentScroll;
      }

      container.scrollTo({
        top: nextPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling = false;
      }, 500);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [ref]);
}
