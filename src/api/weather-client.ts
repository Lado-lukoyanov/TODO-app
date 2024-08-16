import axios from "axios";

export const weatherClient = axios.create({
  baseURL: import.meta.env.VITE_WETHER_API,
});
