import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PlanteService from "../../services/PlanteService";
import AuthService from "../../services/AuthService";
import { CommentProps, PostProps } from "../../shared/interfaces";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-hot-toast";
import PlantPageUserProfil from "./plantPageUserProfil";
import Map from "../../shared/components/Map";
import NewCommentButton from "./newCommentButton";
import Comment from "./comment";

export default function PlantPage() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [data, setData] = useState<PostProps>();
    const [comments, setCommentsData] = useState<CommentProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMapOpened, setIsMapOpened] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            await PlanteService.getPlantById(Number(id))
                .then((res) => {
                    setData(res.data);
                    setCommentsData(res.data.comments);
                })
                .catch(() => {
                    toast.error("Erreur chargement des données.");
                    AuthService.clearStorage();
                    navigate("/login");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        fetchData();
    }, []);

    const toggleMap = () => {
        setIsMapOpened((isMapOpened) => !isMapOpened);
    };

    if (isLoading) {
        return <p className="text-center">loading...</p>;
    }

    if (data === null) {
        return <p className="text-center">Erreur de chargement.</p>;
    }

    const commentsJSX = comments.map((comment) => (
        <Comment
            description={comment.description}
            photo={comment.photo}
            updated_at={comment.updated_at}
            plant_id={comment.plant_id}
            user={comment.user}
        />
    ));

    return (
        <div className="p-6 pb-40">
            <div className="flex justify-between mb-4">
                <PlantPageUserProfil user={data?.user as PostProps["user"]} />
                <button
                    className={`h-100 lowercase text-white p-2 rounded-md font-medium
                        ${isMapOpened ? "bg-red-700" : "bg-green-700"} `}
                    onClick={toggleMap}
                >
                    {isMapOpened ? "Fermer la carte" : "Voir sur la carte"}
                </button>
            </div>
            <Map posts={[data as PostProps]} isMapOpened={isMapOpened} />
            {!isMapOpened && (
                <>
                    <p className="font-medium mb-2">
                        type de plante:
                        <span className="text-green-700">{data?.type}</span>
                    </p>
                    <p className="font-normal mb-2">{data?.description}</p>
                    <img
                        src={data?.photo}
                        className="rounded-md"
                        alt="plante"
                    />

                    <p className="text-center text-green-700 font-medium mt-2">
                        {data?.gardening_service !== null
                            ? `Plante actuellement gardée par ${data?.gardening_service.user.username}`
                            : null}
                    </p>

                    <div className="mt-4 flex justify-between items-baseline">
                        <p className="font-medium">Commentaires:</p>
                        <NewCommentButton
                            plantId={Number(data?.id)}
                            userId={Number(data?.user.id)}
                        />
                    </div>

                    {commentsJSX}
                </>
            )}
        </div>
    );
}
