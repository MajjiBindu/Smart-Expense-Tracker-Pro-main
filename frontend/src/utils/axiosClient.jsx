import axios from "axios";

export const axiosClient = axios.create({
  // baseURL : 'https://expensify-tracker.onrender.com'

  // baseURL : 'http://localhost:4000'  // For local development
  // Or use environment variable:
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000",
});
