import React from 'react'

const RemoveUpload = ({ sheetUploaded, setSheetUploaded, numOfUploadLeads }) => {
    return (
      <div 
        style={{ 
          margin: '1rem 0', 
          padding: '1rem', 
          border: '1px solid #ccc', 
          borderRadius: '6px',
          wordBreak: "break-word"
        }}>
        <p>LinkedIn profile links from this sheet will not be searched again, avoiding duplicate leads.</p>
        <p><strong>Uploaded Sheet URL:</strong> <a href={sheetUploaded} target="_blank" rel="noopener noreferrer">{sheetUploaded}</a></p>
        <p><strong>Number of leads:</strong> {numOfUploadLeads ?? 'Loading...'}</p>
        <button
          onClick={() => setSheetUploaded('')}
          style={{
            backgroundColor: '#e53e3e',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '8px',
          }}
        >
          Remove Upload
        </button>
      </div>
    );
  };
  

export default RemoveUpload