import { AxiosInstance } from "axios";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL}`;

export const useApi = (): AxiosInstance =>
  axios.create({
    baseURL,
    headers,
  });
