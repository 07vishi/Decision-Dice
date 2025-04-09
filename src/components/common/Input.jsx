import React from 'react';
import { getInputClasses } from '../../styles/theme';

const Input = ({ 
  type = 'text',
  theme,
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      className={`
        ${getInputClasses(theme)}
        p-2 w-full
        ${className}
      `}
      {...props}
    />
  );
};

export default Input; 