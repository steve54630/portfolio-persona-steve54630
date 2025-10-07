import { AxiosInstance } from "axios";
import axios from "axios";

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

export const useApi = (): AxiosInstance => axios.create({baseURL : process.env.NEXT_PUBLIC_API_URL, headers});