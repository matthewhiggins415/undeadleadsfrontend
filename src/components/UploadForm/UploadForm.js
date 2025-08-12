import React, { useState } from 'react';

const UploadGoogleSheetForm = ({ onSubmit, setSheetUploaded, setNumOfUploadLeads }) => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [error, setError] = useState('');

  function extractSpreadsheetId(url) {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const spreadsheetId = extractSpreadsheetId(sheetUrl);
    if (!spreadsheetId) {
      setError('Invalid Google Sheet URL');
      return;
    }

    try {
      // If parent gave an onSubmit handler, call it with the full URL
      if (onSubmit) {
        await onSubmit(`https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
      } else {
        // Otherwise call backend directly here
        const res = await fetch('http://localhost:5000/api/upload-sheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}` })
        });

        const data = await res.json();
        console.log("data: ", data)

        if (data.success === true) {
          setSheetUploaded(data.sheetUrl)
          setNumOfUploadLeads(data.data.rows.length)
        }

      }
      setSheetUrl('');
    } catch (err) {
      setError('Failed to upload sheet');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0px auto', marginTop: '20px' }}>
      <label htmlFor="sheetUrl" style={{ display: 'block', marginBottom: '8px' }}>
        Upload your sheet to prevent duplicates:
      </label>
      <input
        id="sheetUrl"
        type="text"
        value={sheetUrl}
        onChange={(e) => setSheetUrl(e.target.value)}
        placeholder="https://docs.google.com/spreadsheets/d/..."
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '8px'
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        type="submit"
        style={{
          padding: '8px 12px',
          border: 'none',
          backgroundColor: '#4285F4',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Upload
      </button>
    </form>
  );
}

export default UploadGoogleSheetForm;