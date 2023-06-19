import { AxiosRequestConfig } from "axios";

export default function getHeaders(): AxiosRequestConfig {

  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
  };
}

export function getHeadersformData(): AxiosRequestConfig {

  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
  };
}


