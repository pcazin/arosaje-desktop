import axios from "axios";
import getHeaders from "./AuthHeader";

const API_URL = "http://127.0.0.1:8000";

export default class GuardeningService {
    static async newGardeningService(
        startDate: string,
        endDate: string,
        userId: number,
        plantId: number
    ): Promise<any> {
        const body = {
            start_date: startDate,
            end_date: endDate,
            plant_id: plantId,
            user_id: userId,
        };

        return axios.post(API_URL + "/gardening_services", body, getHeaders());
    }
}
