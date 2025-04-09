export const theme = {
  dark: {
    text: {
      primary: 'text-gray-200',
      secondary: 'text-gray-400',
      accent: 'text-indigo-400',
    },
    background: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      accent: 'bg-gray-700',
      overlay: 'bg-black/30',
    },
    border: {
      primary: 'border-gray-700',
      secondary: 'border-gray-600',
    },
    input: {
      background: 'bg-gray-700',
      text: 'text-gray-200',
      placeholder: 'placeholder-gray-400',
      focus: 'focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
    },
    button: {
      primary: {
        base: 'bg-indigo-600',
        hover: 'hover:bg-indigo-700',
        active: 'active:bg-indigo-800',
        disabled: 'disabled:bg-gray-600',
      },
      secondary: {
        base: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        active: 'active:bg-purple-800',
        disabled: 'disabled:bg-gray-600',
      },
      success: {
        base: 'bg-green-600',
        hover: 'hover:bg-green-700',
        active: 'active:bg-green-800',
        disabled: 'disabled:bg-gray-600',
      },
      danger: {
        base: 'bg-red-600',
        hover: 'hover:bg-red-700',
        active: 'active:bg-red-800',
        disabled: 'disabled:bg-gray-600',
      },
    },
    effects: {
      glow: 'shadow-lg shadow-indigo-500/20',
      glassmorphism: 'backdrop-blur-md bg-gray-900/30',
    },
  },
  light: {
    text: {
      primary: 'text-gray-800',
      secondary: 'text-gray-600',
      accent: 'text-indigo-600',
    },
    background: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      accent: 'bg-gray-100',
      overlay: 'bg-white/30',
    },
    border: {
      primary: 'border-gray-200',
      secondary: 'border-gray-300',
    },
    input: {
      background: 'bg-white',
      text: 'text-gray-800',
      placeholder: 'placeholder-gray-500',
      focus: 'focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
    },
    button: {
      primary: {
        base: 'bg-indigo-600',
        hover: 'hover:bg-indigo-700',
        active: 'active:bg-indigo-800',
        disabled: 'disabled:bg-gray-300',
      },
      secondary: {
        base: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        active: 'active:bg-purple-800',
        disabled: 'disabled:bg-gray-300',
      },
      success: {
        base: 'bg-green-600',
        hover: 'hover:bg-green-700',
        active: 'active:bg-green-800',
        disabled: 'disabled:bg-gray-300',
      },
      danger: {
        base: 'bg-red-500',
        hover: 'hover:bg-red-600',
        active: 'active:bg-red-700',
        disabled: 'disabled:bg-gray-300',
      },
    },
    effects: {
      glow: 'shadow-lg shadow-indigo-500/10',
      glassmorphism: 'backdrop-blur-md bg-white/30',
    },
  },
};

export const getButtonClasses = (theme, variant = 'primary') => {
  const buttonTheme = theme.button[variant];
  return `${buttonTheme.base} ${buttonTheme.hover} ${buttonTheme.active} ${buttonTheme.disabled} text-white transition-all duration-200`;
};

export const getInputClasses = (theme) => {
  return `${theme.input.background} ${theme.input.text} ${theme.input.placeholder} ${theme.input.focus} border ${theme.border.primary} rounded-lg transition-all duration-200`;
}; 