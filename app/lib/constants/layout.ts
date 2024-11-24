export const LAYOUT = {
  BREAKPOINTS: {
    MOBILE: 768,
  },
  SIZES: {
    IMAGE: {
      LANDSCAPE: {
        MAX_WIDTH: 300,
        MAX_HEIGHT: 225,
        ASPECT_RATIO: "4/3",
        PAGE_MAX_WIDTH: 1200,
        PAGE_MAX_HEIGHT: 800,
      },
      PORTRAIT: {
        MAX_WIDTH: 225,
        MAX_HEIGHT: 300,
        ASPECT_RATIO: "3/4",
        PAGE_MAX_WIDTH: 800,
        PAGE_MAX_HEIGHT: 1200,
      },
    },
    SPACING: {
      PAGE_TOP_MARGIN: 220,
    },
  },
} as const;
