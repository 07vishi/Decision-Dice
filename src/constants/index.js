export const STORAGE_KEYS = {
  THEME: 'decisionDiceTheme'
};

export const ANIMATIONS = {
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  SLIDE_UP: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  },
  SCALE: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 }
  }
}; 