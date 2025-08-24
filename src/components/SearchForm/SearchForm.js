import React, { useState } from 'react';
import { Container } from './SearchForm.styles';

const SearchForm = ({ loading }) => {
  const [sheetName, setSheetName] = useState('');
  const [titles, setTitles] = useState(['VP', 'CTO']);
  const [keywords, setKeywords] = useState(['video streaming']);
  const [location, setLocation] = useState(['US']);
  const [numPages, setNumPages] = useState(5); // NEW state for pages

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleString = titles.map(t => `"${t}"`).join(' OR ');
    const keywordString = keywords.map(k => `"${k}"`).join(' OR ');
    const locationString = location.map(l => `"${l}"`).join(' OR ');

    const query = `site:linkedin.com/in/ (${titleString}) (${keywordString}) (${locationString})`;

    const newWindow = window.open('', '_blank'); // open immediately on click

    try {
      const res = await fetch(`http://localhost:5000/api/google/scrape-leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query,
          sheetName: sheetName,
          titleString: titleString,
          keywordString: keywordString,
          locationString: locationString,
          numPages: parseInt(numPages, 10) // send as integer
        })
      });

      const data = await res.json();
      console.log("Backend response:", data);
      loading(true)

      if (data.message === 'Scraping complete!') {
        loading(false);
        newWindow.location.href = data.url; // navigate opened window
      } else {
        console.error('❌ Sheet creation failed:', data.error);
      }
    } catch (err) {
      console.error('❌ Error calling backend:', err);
    }
  };

  const canSubmit =
    sheetName.trim() !== '' &&
    titles.filter(t => t.trim() !== '').length > 0 &&
    keywords.filter(k => k.trim() !== '').length > 0 &&
    location.filter(l => l.trim() !== '').length > 0 &&
    numPages > 0; // must be at least 1 page

  return (
    <Container>
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>Name of google sheets folder:</label>
        <input
          type="text"
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
          style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '8px'
        }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>Job Titles (comma-separated):</label>
        <input
          type="text"
          value={titles.join(', ')}
          onChange={(e) => setTitles(e.target.value.split(',').map(t => t.trim()))}
          style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '8px'
        }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>Keywords (comma-separated):</label>
        <input
          type="text"
          value={keywords.join(', ')}
          onChange={(e) => setKeywords(e.target.value.split(',').map(k => k.trim()))}
          style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '8px'
        }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>Locations (comma-separated):</label>
        <input
          type="text"
          value={location.join(', ')}
          onChange={(e) => setLocation(e.target.value.split(',').map(loc => loc.trim()))}
          style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '8px'
        }}
        />
      </div>

      {/* NEW: Number of Pages */}
      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>Number of Pages to Scrape:</label>
        <input
          type="number"
          min="1"
          value={numPages}
          onChange={(e) => setNumPages(e.target.value)}
          style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '8px'
        }}
        />
      </div>

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
        disabled={!canSubmit}
      >
        Generate Search Query
      </button>
    </form>
    </Container>
  );
}

export default SearchForm