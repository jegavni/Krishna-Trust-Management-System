import axios from "axios";

console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
console.log("MODE =", import.meta.env.MODE);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export default api;