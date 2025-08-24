// src/components/ReauthModal/ReauthModal.js
import React from 'react';

const CaptchaModal = ({ show, onSolve }) => {
  if (!show) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2>Complete CAPTCHA then continue</h2>
        <p>Only hit continue once google captcha is complete.</p>
        <div style={styles.actions}>
          <button onClick={onSolve} style={styles.buttonPrimary}>Continue</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    width: '400px',
    textAlign: 'center'
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonPrimary: {
    background: '#4285F4',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  buttonSecondary: {
    background: '#e0e0e0',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default CaptchaModal;