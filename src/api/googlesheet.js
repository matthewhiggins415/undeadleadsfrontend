import axios from 'axios';
import apiUrl from '../apiConfig.js';

const handleCreateSheet = async () => {
  const res = await fetch('http://localhost:5000/create-sheet');
  const data = await res.json();
  
  if (data.url) {
    window.open(data.url, '_blank'); // opens sheet in new tab
  } else {
    alert('Failed to create sheet.');
  }
};