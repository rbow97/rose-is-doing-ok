import { useState, useEffect } from "react";

interface HeaderScrollOptions {
  threshold?: number;
}

export function useHeaderScroll({ threshold = 100 }: HeaderScrollOptions = {}) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      // Show header at the top of the page
      if (currentScrollY < threshold) {
        setIsHidden(false);
        return;
      }

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY, threshold]);

  return { isHidden };
}
