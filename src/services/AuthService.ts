import axios, { AxiosRequestConfig } from "axios";
import { UserProps } from "../shared/interfaces";
import getHeaders from "./AuthHeader";
import { useNavigate } from "react-router-dom";

/* const API_URL = "http://localhost:8000"; */
const API_URL = "http://192.168.1.18:8000";

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
                localStorage.setItem(
                    "counts",
                    JSON.stringify({
                        plants: response.data.plants.length as any,
                        comments: response.data.comments.length,
                        gardening_services: response.data.gardening_services.length
                    })
                );

                return response.data;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    static async register(
        username: string,
        password: string,
        location: string,
        bio: string,
        profile_picture: string
    ) {
        const data = {
            username: username,
            password: password,
            location: location,
            bio: bio,
            profile_picture: profile_picture,
        };
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
                localStorage.setItem(
                    "counts",
                    JSON.stringify({
                        plants: response.data.plants.length as any,
                        comments: response.data.comments.length,
                        gardening_services: response.data.gardening_services.length
                    })
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
