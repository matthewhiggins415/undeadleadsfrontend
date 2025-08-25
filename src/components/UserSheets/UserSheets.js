// src/components/SheetsList/SheetsList.js
import React from 'react';

const SheetsList = ({ sheets }) => {
  if (!sheets || sheets.length === 0) {
    return <p>No sheets found.</p>;
  }

  return (
    <div>
      <h1>Scrape History</h1>
      <div>
        {sheets.map((sheet) => (
          <div key={sheet.id} style={{ marginBottom: '1rem', borderBottom: '1px solid black', paddingBottom: '1rem' }}>
            <p><strong>Name:</strong>{sheet.name}</p>
            <p><strong>Created At:</strong> {new Date(sheet.createdAt).toLocaleString()}</p>
            <p><strong>ID:</strong> {sheet.id}</p>
            <p>
              <strong>URL:</strong>{" "}
              <a href={sheet.url} target="_blank" rel="noopener noreferrer">
                {sheet.url}
              </a>
            </p>
            <div>
              <button style={{ marginRight: "1rem", cursor: "pointer" }}>delete</button>
              <button style={{ marginRight: "1rem", cursor: "pointer" }}>de-dupe</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SheetsList;
