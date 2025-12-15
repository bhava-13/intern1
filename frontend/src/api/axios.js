import axios from "axios";

const api = axios.create({
  baseURL: "https://doctor-appointment-system-backend-2ulw.onrender.com",
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;
