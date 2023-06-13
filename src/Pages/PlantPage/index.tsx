import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PlanteService from "../../services/PlanteService";
import AuthService from "../../services/AuthService";
import { PostProps } from "../../shared/interfaces";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-hot-toast";
import PlantPageUserProfil from "./plantPageUserProfil";
import Map from "../../shared/components/Map";

export default function PlantPage() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [data, setData] = useState<PostProps>();
    const [isLoading, setIsLoading] = useState(true);
    const [isMapOpened, setIsMapOpened] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            await PlanteService.getPlantById(Number(id))
                .then((res) => {
                    console.log(res);
                    setData(res.data);
                })
                .catch(() => {
                    toast.error("Erreur chargement des données.")
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

    return (
        <div className="p-6">
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
            {isMapOpened ? (
                <Map posts={[data as PostProps]} />
            ) : (
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
                </>
            )}
        </div>
    );
}
