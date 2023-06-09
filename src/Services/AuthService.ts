import axios, { AxiosRequestConfig } from "axios";
import { UserProps } from "../shared/UserProps";
import getHeaders from "./AuthHeader";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000";

export default class AuthService {
    static async login(username: string, password: string) {
        const data = { username: username, password: password };

        return axios
            .post(API_URL + "/user/login", data, getHeaders())
            .then((response) => {
                const token = JSON.stringify(response.data.token.access_token);
                const user = JSON.stringify(response.data.user);

                console.log(token);

                localStorage.setItem("token", JSON.parse(token));
                localStorage.setItem("user", user);

                return response.data;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    static async register(username: string, password: string) {
        const data = { username: username, password: password };
        const url = API_URL + "/user/signup";

        return axios
            .post(url, data, getHeaders())
            .then((response) => {
                localStorage.setItem(
                    "token",
                    JSON.parse(JSON.stringify(response.data.token.access_token))
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    static isConnected() {
        const token = localStorage.getItem("token");

        return token ? true : false;
    }

    static getCurrentUser(): UserProps | null {
        if (!localStorage.getItem("user")) {
            return null;
        }

        return JSON.parse(localStorage.getItem("user") as string) as UserProps;
    }

    static clearStorage(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}
