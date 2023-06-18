import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessageService from "../../services/MessageService";
import { UserProps } from "../../shared/interfaces";
import AuthService from "../../services/AuthService";
import toast from "react-hot-toast";
import ConversationInput from "./conversationInput";
import Message, { MessageProps } from "../PlantAddCommentPage/message";
import './styles.css';

export default function HomePage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true);
    const [data, setData] = useState<MessageProps[]>([]);
    const bottomRef = useRef<null | HTMLDivElement>(null);

    const handleSubmit = async (value: string) => {
        const user: UserProps | null = AuthService.getCurrentUser();

        if (!user) {
            toast.error("Vous devez être connecté pour envoyer un message.");
            navigate("/login");
            return;
        }

        await MessageService.sendMessage(Number(userId), user.id, value)
            .then((res) => {
                console.log(res);
                setData((data) => [res.data, ...data]);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Erreur lors de l'envoie, réessayez plus tard.");
                navigate("/login");
            });
    };

    const scrolToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const currentUser: UserProps | null = AuthService.getCurrentUser();

        if (!currentUser) {
            console.error("Aucun utilisateur trouvé.");
            toast.error("Aucun utilisateur trouvé.");
            AuthService.clearStorage();
            navigate("/login");
        }

        MessageService.getConversation(Number(userId), Number(currentUser?.id))
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
                AuthService.clearStorage();
                toast.error("Erreur.");
                navigate("/login");
            })
            .finally(() => {
                setisLoading(false);
            });
    }, []);

    useEffect(() => {
        scrolToBottom();
    }, [data]);

    if (isLoading)
        return <p className="text-center">Chargement des données...</p>;

    const messages = data
        .slice()
        .reverse()
        .map((message) => <Message message={message} />);

    return (
        <div
            className="p-10 flex flex-col items-center justify-end pb-20 overflow-hidden"
            style={{ height: "800px" }}
        >
            <div className="overflow-y-scroll scrollbar-hide bottom-0">
                {messages}
                <div ref={bottomRef}></div>
            </div>
            <ConversationInput onSubmit={handleSubmit} />
        </div>
    );
}
