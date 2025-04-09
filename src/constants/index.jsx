export const STORAGE_KEYS = {
  THEME: 'decisionDiceTheme',
  CATEGORIES: 'decisionDiceCategories',
  HISTORY: 'decisionDiceHistory',
};

export const ANIMATIONS = {
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  SLIDE_UP: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  SCALE: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
};

export const DICE_DEFAULTS = {
  ROLL_DURATION: 2000,
  ROLL_INTERVAL: 100,
  MAX_HISTORY: 10,
  DEFAULT_WEIGHT: 1,
}; 