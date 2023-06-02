import { AxiosRequestConfig } from "axios";

export default function getHeaders(): AxiosRequestConfig {

  return {
    headers: {
      'Content-Type': 'application/json',
      'access_token': localStorage.getItem('token') || null
    }
  };
}

