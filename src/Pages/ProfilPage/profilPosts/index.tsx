import React, { useEffect, useState } from "react";
import PlanteService from "../../../services/PlanteService";
import { PostProps } from "../../../shared/interfaces";
import Post from "../../../components/home/Post";
import AuthService from "../../../services/AuthService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ProfilPostsProps {
    userId: number;
    redirectToUpdatePlant?: boolean;
}

export default function ProfilPosts({ userId, redirectToUpdatePlant }: ProfilPostsProps) {
    const [data, setData] = useState<PostProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await PlanteService.getPlantByUserId(userId);
                setData(data.data);
            } catch (err) {
                console.error(err);
                toast.error("Une erreur est survenue.");
                AuthService.clearStorage();
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <p className="text-center">Chargement des données...</p>;
    }

    if (data.length === 0) {
        return <p className="text-center">Aucune données à afficher.</p>;
    }

    const posts: React.ReactElement<typeof Post>[] = data.map((post) => (
        <Post data={post} hiddeProfilAndMessage={true} RedirectToUpdatePlant={redirectToUpdatePlant} />
    ));

    return <div className="mt-2 mb-28">
        <div className="flex justify-center">
            <div className="w-4/5 h-px bg-slate-300 mb-8"></div>
        </div>
        {posts}
    </div>;
}
