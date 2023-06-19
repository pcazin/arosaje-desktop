import "./styles.css";
import toast from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import { PostProps, UserProps } from "../../shared/interfaces";
import AuthService from "../../services/AuthService";
import MessageService from "../../services/MessageService";
import ConversationInput from "./conversationInput";
import UserService from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Message, { MessageProps } from "../PlantAddCommentPage/message";
import GuardeningService from "../../services/GuardeningService";

export default function HomePage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true);
    const [data, setData] = useState<MessageProps[]>([]);
    const bottomRef = useRef<null | HTMLDivElement>(null);
    const [otherUserData, setOtherUserData] = useState<UserProps>();
    const [showModalService, setShowModalService] = useState(false);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [selectedPlantServiceId, setSelectedPlantServiceId] = useState<number | null>();
    const [plants, setPlants] = useState([]);

    const ValidateService = () => {
        if (dateStart === "" || dateEnd === "") {
            toast.error(
                "Vous devez entrer une date de début et une date de fin."
            );
            return;
        }

        if (new Date(dateStart) >= new Date(dateEnd)) {
            toast.error(
                "La date de fin doit être supérieure à la date de début."
            );
            return;
        }

        const regexPattern = /^\d{4}\/\d{2}\/\d{2}$/;
        const isValidFormat = regexPattern.test(dateStart);

        if (!isValidFormat) {
            toast.error("Format de date invalide");
            return;
        }

        const currentUser: UserProps | null = AuthService.getCurrentUser();

        if (currentUser === null) {
            toast.error(
                "Vous devez être connecté pour utiliser cette commande."
            );
            return;
        }

        if(selectedPlantServiceId === null) {
            toast.error("Vous devez sélectionner une plant pour utiliser cette commande.");
            return;
        }

        // faire la requete
        GuardeningService.newGardeningService(
            new Date(dateStart).toISOString(),
            new Date(dateEnd).toISOString(),
            Number(userId),
            Number(selectedPlantServiceId)
        )
            .then((res) => {
                toggleShowModaleService();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleDateStartInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputDate = event.target.value;
        // Remove any non-digit characters from the input
        const sanitizedDate = inputDate.replace(/\D/g, "");

        // Format the date with slashes
        let formattedDate = "";
        if (sanitizedDate.length > 6) {
            formattedDate = `${sanitizedDate.slice(0, 4)}/${sanitizedDate.slice(
                4,
                6
            )}/${sanitizedDate.slice(6, 8)}`;
        } else if (sanitizedDate.length > 4) {
            formattedDate = `${sanitizedDate.slice(0, 4)}/${sanitizedDate.slice(
                4,
                6
            )}`;
        } else if (sanitizedDate.length > 0) {
            formattedDate = `${sanitizedDate.slice(0, 4)}`;
        }

        setDateStart(formattedDate);
    };

    const handleDateEndInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (dateStart === "") {
            return;
        }

        const inputDate = event.target.value;
        const sanitizedDate = inputDate.replace(/\D/g, "");

        let formattedDate = "";
        if (sanitizedDate.length > 6) {
            formattedDate = `${sanitizedDate.slice(0, 4)}/${sanitizedDate.slice(
                4,
                6
            )}/${sanitizedDate.slice(6, 8)}`;
        } else if (sanitizedDate.length > 4) {
            formattedDate = `${sanitizedDate.slice(0, 4)}/${sanitizedDate.slice(
                4,
                6
            )}`;
        } else if (sanitizedDate.length > 0) {
            formattedDate = `${sanitizedDate.slice(0, 4)}`;
        }

        setDateEnd(formattedDate);
    };

    const handleSubmitMessage = async (value: string) => {
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

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const toggleShowModaleService = () => {
        setShowModalService((show) => !show);
        scrollToBottom();
    };

    const handleSelectChange = (event: React.ChangeEvent<any>) => {
        setSelectedPlantServiceId(Number(event.target.value))
    }

    useEffect(() => {
        const currentUser: UserProps | null = AuthService.getCurrentUser();

        if (currentUser === null) {
            console.error("Aucun utilisateur trouvé.");
            toast.error("Aucun utilisateur trouvé.");
            AuthService.clearStorage();
            navigate("/login");
        }

        MessageService.getConversation(Number(userId), Number(currentUser?.id))
            .then((res) => {

                const user: UserProps = res.data.length === 0 ? currentUser : (
                    res.data[0].receiver.id === currentUser?.id
                        ? res.data[0].sender
                        : res.data[0].receiver)
                setOtherUserData(user);
                setData(res.data);
                UserService.getUserById(Number(currentUser?.id)).then((res) => {
                    console.log("plants =");
                    console.log(res.data.plants);
                    setPlants(res.data.plants.filter((plant: PostProps) => plant.gardening_service !== null));
                });
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
        scrollToBottom();
    }, [data]);

    scrollToBottom();

    if (isLoading) {
        return <p className="text-center">Chargement des données...</p>;
    }

    if (showModalService) {

        return (
            <div className="flex flex-col items-center gap-y-4 py-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-60">
                <p className="text-center">Nouvelle demande de service</p>
                <input
                    className="text-center"
                    type="text"
                    value={dateStart}
                    onChange={handleDateStartInputChange}
                    placeholder="année/moi/jour"
                />
                <input
                    className="text-center"
                    type="text"
                    value={dateEnd}
                    onChange={handleDateEndInputChange}
                    placeholder="année/moi/jour"
                />
                <select onChange={handleSelectChange}>
                    {plants.map((x: PostProps, y) => (
                        <option key={y} value={x.id}>{x.name}</option>
                    ))}
                </select>
                
                <div className="flex gap-2">
                    <button
                        onClick={ValidateService}
                        className="bg-green-700 text-white rounded-lg py-2 px-4 text-sm font-medium focus:outline-none focus:ring"
                    >
                        Valider
                    </button>
                    <button
                        onClick={toggleShowModaleService}
                        className="bg-red-700 text-white rounded-lg py-2 px-4 text-sm font-medium focus:outline-none focus:ring"
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    const messages = data
        .slice()
        .reverse()
        .map((message) => <Message message={message} />);

    return (
        <div
            className="p-10 flex flex-col items-center justify-end pb-20 overflow-hidden"
            style={{ height: "800px" }}
        >
            <div className="w-full h-18 px-8 bg-white absolute top-6 flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <img
                        className="rounded-full w-16 h-16"
                        src={otherUserData?.profile_picture}
                        alt="photo de profil"
                    />
                    <p className="text-center font-medium capitalize">
                        {otherUserData?.username}
                    </p>
                </div>

                <div
                    onClick={toggleShowModaleService}
                    className="flex justify-center items-center w-12 h-12 border-2 border-black rounded-full"
                >
                    <AddIcon />
                </div>
            </div>
            <div className="overflow-y-scroll scrollbar-hide bottom-0">
                {messages}
                <div ref={bottomRef}></div>
            </div>
            <ConversationInput onSubmit={handleSubmitMessage} />
        </div>
    );
}
