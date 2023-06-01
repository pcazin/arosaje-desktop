import axios from "axios";
import authHeaders from "./AuthHeader";
import { UserProps } from "../shared/UserProps";

const API_URL = "http://localhost:8000";

export default class AuthService {

  static async login(username: string, password: string) {

    const body = { 'username': username, 'password': password }

    return axios
      .post(API_URL + "/user/login", { headers: authHeaders(), data : { body: body }})
      .then(response => {
        localStorage.setItem("token", JSON.stringify(response.data.token.access_token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data
      })
      .catch((error) => {
        console.error(error)
        return error;
      })
  }

  static async register(username: string, password: string) {

    const body = { 'username': username, 'password': password }

    return axios.post(API_URL + "/user/signup", { headers: authHeaders(), data : { body: body }})
      .then(response => {
        localStorage.setItem("token", JSON.stringify(response.data.token.access_token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data
      })
      .catch((error) => {
        console.error(error)
        return error;
      })
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  static isConnected() {
    const token = localStorage.getItem('token');

    return token ? true : false;
  }

  static getCurrentUser(): UserProps | null {

    if(!localStorage.getItem('user')) {
      return null;
    }

    return localStorage.getItem('user') as unknown as UserProps
  }
}
