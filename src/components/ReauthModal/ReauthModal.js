// src/components/ReauthModal/ReauthModal.js
import React from 'react';

const ReauthModal = ({ show, onClose }) => {
  if (!show) return null;

  const handleReauth = () => {
    window.location.href = 'http://localhost:5000/api/google/auth'; // kicks off OAuth2 again
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2>Session Expired</h2>
        <p>Your Google authentication expired. Please reconnect to continue.</p>
        <div style={styles.actions}>
          <button onClick={handleReauth} style={styles.buttonPrimary}>Reconnect</button>
          <button onClick={onClose} style={styles.buttonSecondary}>Cancel</button>
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

export default ReauthModal;