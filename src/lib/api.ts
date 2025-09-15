import axios from "axios";
import { BASE_API_URL } from "./constatns/api.constant";

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
