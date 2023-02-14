import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.access_token) {
          localStorage.setItem("access_token", JSON.stringify(response.access_token));
        } else {
          throw new Error("Login failed.")
        }
      });
  }

  register(username, password) {
    return axios.post(API_URL + "signup", {
      username,
      password
    })
    .then( response => {
      if(response.access_token) {
        localStorage.setItem("access_token", JSON.stringify(response.access_token));
      } else {
        throw new Error("Register failed.")
      }
    })
  }

  logout() {
    localStorage.removeItem("access_token");
  }

  getCurrentUser() {
    // refaire une requete pour fetch le user
    // doit retourner tout sur le user
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();