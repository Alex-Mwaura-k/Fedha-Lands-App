import axios from "axios";

// Fallback to localhost for local dev
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
// Export this so you can use it for <img src={MEDIA_URL + item.img} />
export const MEDIA_URL =
  import.meta.env.VITE_MEDIA_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
