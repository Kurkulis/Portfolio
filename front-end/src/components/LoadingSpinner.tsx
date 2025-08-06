import React from 'react';
import { Spinner } from 'react-bootstrap';
import type { LoadingSpinnerProps } from '../types/types';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'lg',
  variant = 'primary',
  text = 'Loading...',
  fullScreen = false
}) => {
  const spinnerContent = (
    <div className="text-center">
      <Spinner 
        animation="border" 
        variant={variant} 
        {...(size === 'sm' ? { size: 'sm' } : {})}
        className="mb-3"
      />
      {text && (
        <div className={`text-${variant} fw-medium`}>
          {text}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;

