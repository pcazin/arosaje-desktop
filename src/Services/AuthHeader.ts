import { AxiosRequestConfig } from "axios";

export default function getHeaders(): AxiosRequestConfig {

  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
  };
}


