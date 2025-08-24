import React from 'react';

const LoadingSpinner = ({ show }) => {
  if (!show) return null;

  // Styles
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const spinnerStyle = {
    width: '60px',
    height: '60px',
    border: '6px solid #3b82f6',
    borderTop: '6px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const textStyle = {
    marginTop: '1rem',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 500,
  };

  // Add keyframes for spinner animation
  const spinnerKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{spinnerKeyframes}</style>
      <div style={overlayStyle}>
        <div style={containerStyle}>
          <div style={spinnerStyle}></div>
          <p style={textStyle}>Scraping...</p>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
