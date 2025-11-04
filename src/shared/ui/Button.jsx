import React from 'react';

export function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn ${variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}`} {...props}>
      {children}
    </button>
  );
}


