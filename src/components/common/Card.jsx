import React from 'react';

const Card = ({ 
  children, 
  theme,
  className = '',
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: `${theme.background.secondary} border ${theme.border.primary}`,
    glass: `${theme.effects.glassmorphism} border ${theme.border.primary}`,
    elevated: `${theme.background.secondary} border ${theme.border.primary} ${theme.effects.glow}`,
  };

  return (
    <div
      className={`
        ${variants[variant]}
        rounded-lg p-4
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 