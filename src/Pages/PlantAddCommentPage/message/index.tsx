import React from "react";
import { UserProps } from "../../../shared/interfaces";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export interface MessageProps {
    content: string;
    photo: string;
    updated_at: string;
    id: string;
    sender: UserProps;
    receiver: UserProps;
    created_at: string;
}
// le contenu du message
// qui est le receiver
// si je suis la meme personne que le receiver

export default function Message({ message }: { message: MessageProps }) {
    const navigate = useNavigate();

    const user: UserProps | null = AuthService.getCurrentUser();

    if (!user) {
        toast.error("Vous devez être connecté pour afficher les messages");
        navigate("/login");
        return null;
    }

    const isUseSender = user.id === message.sender.id;

    return (
        <div className={`w-full flex  mt-2 ${isUseSender ? "justify-end" : "justify-start"}`}>
            <div
                className={`p-2 rounded text-white font-medium hyphens-auto ${
                    isUseSender ? "bg-green-700 " : "bg-amber-600"
                }`}

                style={{maxWidth: "70%"}}
            >
                <p>{message.content}</p>
            </div>
        </div>
    );
}
