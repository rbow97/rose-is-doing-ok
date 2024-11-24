import { LAYOUT } from "../lib/constants/layout";

export function useImageDimensions(aspectRatio: number = 1) {
  const isLandscape = aspectRatio >= 1;

  const dimensions = {
    width: isLandscape
      ? LAYOUT.SIZES.IMAGE.LANDSCAPE.MAX_WIDTH
      : LAYOUT.SIZES.IMAGE.PORTRAIT.MAX_WIDTH,
    height: isLandscape
      ? LAYOUT.SIZES.IMAGE.LANDSCAPE.MAX_HEIGHT
      : LAYOUT.SIZES.IMAGE.PORTRAIT.MAX_HEIGHT,
    aspectRatio: isLandscape
      ? LAYOUT.SIZES.IMAGE.LANDSCAPE.ASPECT_RATIO
      : LAYOUT.SIZES.IMAGE.PORTRAIT.ASPECT_RATIO,
  };

  return { isLandscape, ...dimensions };
}
