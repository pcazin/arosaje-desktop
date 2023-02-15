import axios from "axios";
import authHeaders from "./auth-header";

const API_URL = "http://localhost:8000";

class AuthService {

  async login(username, password) {

    const body = { 'username': username, 'password': password }

    return axios
      .post(API_URL + "/user/login", body, authHeaders())
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

  async register(username, password) {

    const body = { 'username': username, 'password': password }

    return axios.post(API_URL + "/user/signup", body, authHeaders())
      .then(response => {
        console.log("ici")
        console.log(response.data.token.access_token)
        localStorage.setItem("token", JSON.stringify(response.data.token.access_token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data
      })
      .catch((error) => {
        console.error(error)
        return error;
      })
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  isConnected() {
    const token = localStorage.getItem('token');

    return token ? true : false;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

const authService = new AuthService();
export default authService;