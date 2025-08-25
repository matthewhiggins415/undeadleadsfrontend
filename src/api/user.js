// src/api/sheetsApi.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/sheets"; 
// 👆 adjust if your backend runs elsewhere (prod URL, Vercel, etc.)

// ✅ Create a new sheet
export const createSheet = async (id, url) => {
  const res = await axios.post(API_BASE, { id, url });
  return res.data;
};

// ✅ Get all sheets
export const getAllSheets = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

// ✅ Get a single sheet by ID
export const getSheet = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

// ✅ Update a sheet’s URL
export const updateSheet = async (id, url) => {
  const res = await axios.put(`${API_BASE}/${id}`, { url });
  return res.data;
};

// ✅ Delete a sheet
export const deleteSheet = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
