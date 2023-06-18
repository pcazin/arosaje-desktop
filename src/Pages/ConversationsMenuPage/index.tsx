import React, { useEffect, useState } from "react";
import { UserProps } from "../../shared/interfaces";
import AuthService from "../../services/AuthService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MessageService from "../../services/MessageService";
import ConversationsMenuItem, { ConversationsMenuItemProps } from "./conversationsMenuItem";

export default function ConversationsMenuPage() {
    const [data, setData] = useState<ConversationsMenuItemProps[]>([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const user: UserProps | null = AuthService.getCurrentUser();

    useEffect(() => {
        if (!user) {
            toast.error(
                "Vous devez être connecté pour afficher vos conversations."
            );
            navigate("/login");
            return;
        }

        MessageService.getConversationMenu(user.id)
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    "Une erreur est survenue lors du chargement des données."
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleClick = (receiverId: number) => {
        navigate(`/conversation/${Number(user?.id)}/${receiverId}`);
    };

    if (isLoading)
        return <p className="text-center">Chargement des données.</p>;

        console.log("data")
        console.log(data)

    if (data.length === 0)
        return <p className="text-center">Aucune conversation à afficher.</p>;

    const menuItems = data.map(item => <ConversationsMenuItem item={item}/>)

    return <div className="p-6 pb-40">{menuItems}</div>;
}
