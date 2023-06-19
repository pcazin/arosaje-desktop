import React from "react";
import { useNavigate } from "react-router-dom";
import { UserProps } from "../../../shared/interfaces";
import AuthService from "../../../services/AuthService";
import { toast } from "react-hot-toast";

export interface ConversationsMenuItemProps {
    content: "Hello, how are you?";
    created_at: string;
    id: number;
    photo: "https://example.com/photo.jpg";
    receiver: UserProps;
    sender: UserProps;
}

export default function ConversationsMenuItem({
    item,
}: {
    item: ConversationsMenuItemProps;
}) {
    const navigate = useNavigate();

    const user: UserProps | null = AuthService.getCurrentUser();

    if (!user) {
        toast.error("Vous devez être connecté pour accéder aux conversations.");
        navigate("/login");
        return null;
    }

    const userIsSender = user.id === item.sender.id;

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        const id = user.id === item.receiver.id ? item.sender.id : item.receiver.id;
        navigate(`/messages/${id}`);
    };

    return (
        <div className="w-full flex gap-2 items-center" onClick={handleClick}>
            <img
                className="w-16 rounded-full"
                src={
                    userIsSender
                        ? item.sender.profile_picture
                        : item.receiver.profile_picture
                }
                alt="photo de profil"
            />
            <div className="flex flex-col">
                <p className="font-semibold">
                    {userIsSender
                        ? item.receiver.username
                        : item.sender.username}
                </p>
                <p className="text-left">{item.content.length > 30 ? item.content.slice(0, 28) + "..." : item.content}</p>
            </div>
        </div>
    );
}
