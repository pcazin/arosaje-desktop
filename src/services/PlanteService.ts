import axios from "axios";
import authHeaders, { getHeadersformData } from "./AuthHeader";
import authService from "./AuthService";
import { PostProps, UserProps } from "../shared/interfaces";
import getHeaders from "./AuthHeader";
import { promises } from "dns";

const API_URL = "http://127.0.0.1:8000";

export default class PlanteService {
    static async getFeed(): Promise<any> {
        return axios.get(API_URL + "/plants?skip=0&limit=100", getHeaders());
    }

    static async newPlant(
        nom: string,
        type: string,
        description: string,
        photo: string,
        latitude: string,
        longitude: string
    ): Promise<any> {
        const currentUser: null | UserProps = authService.getCurrentUser();

        if (currentUser === null) {
            console.error("no current user found.");
            throw new Error("No user in getCurrentUser");
        }

        const body = {
            name: nom,
            type: type,
            description: description,
            latitude: latitude,
            longitude: longitude,
            photo: photo,
            user_id: currentUser.id,
        };

        return axios.post(API_URL + "/plants", body, {
            headers: {
                Authorization: ("Bearer " +
                    localStorage.getItem("token")) as string,
            },
        });
    }

    static async deletePlant(plantId: number) {
        return axios.delete(`${API_URL}/plant/${plantId}`, getHeaders());
    }

    static async updatePlant(
        plantId: number,
        nom: string,
        type: string,
        description: string,
        photo: string,
        longitude: string,
        latitude: string
    ): Promise<any> {
        const currentUser: null | UserProps = authService.getCurrentUser();

        if (currentUser === null) {
            throw new Error("No user in getCurrentUser");
        }

        return axios.put(
            API_URL + `/plant/${plantId}`,
            {
                name: nom,
                type: type,
                description: description,
                latitude: latitude,
                longitude: longitude,
                photo: photo,
                updated_at: new Date(),
            },

            getHeaders()
        );
    }

    static async getPlantById(plant_id: number): Promise<any> {
        return axios.get(API_URL + `/plant/${plant_id}`, getHeaders());
    }

    static async getPlantByUserId(userId: number): Promise<any> {
        return axios.get(API_URL + `/plants/user/${userId}`, getHeaders());
    }

    static async newComment(
        description: string,
        photo: string,
        plantId: number,
        userId: number
    ): Promise<any> {
        const body = {
            description: description,
            photo: photo,
            plant_id: plantId,
            user_id: userId,
        };

        return axios.post(API_URL + "/comments", body, getHeaders());
    }
}
