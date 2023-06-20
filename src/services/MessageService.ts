import axios from "axios";
import getHeaders from "./AuthHeader";

const API_URL = "http://127.0.0.1:8000";

export default class MessageService {
    static async getConversation(
        otherUserId: number,
        myUserId: number
    ): Promise<any> {
        return axios.get(
            API_URL + `/conversation/${myUserId}/${otherUserId}`,
            getHeaders()
        );
    }

    static async getConversationMenu(userId: number) {
        return axios.get(API_URL + `/conversations/${userId}`, getHeaders())
    }

    static async sendMessage(
        otherUserId: number,
        myUserId: number,
        text: string
    ): Promise<any> {
        const body = {
            content: text,
            photo: "string",
            sender_id: myUserId,
            receiver_id: otherUserId,
        };

        return axios.post(API_URL + `/messages`, body, getHeaders());
    }
}
