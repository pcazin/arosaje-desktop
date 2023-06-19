import React, { useEffect, useState } from "react";
import { PostProps } from "../../shared/interfaces";
import AuthService from "../../services/AuthService";
import { UserProps } from "../../shared/interfaces";
import NoProfilePicture from "../../components/profil/NoProfilePicture";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import ProfilHeader from "../../shared/components/ProfilHeader";
import ProfilPosts from "../ProfilPage/profilPosts";

export default function ProfilPageUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState<UserProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            UserService.getUserById(Number(id))
                .then((res) => {
                    console.log(res);
                    setUser(res.data);
                })
                .catch(() => {
                    AuthService.clearStorage();
                    navigate("/login");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        fetchData();
    }, []);

    if (isLoading)
        return <p className="text-center">Chargement des données...</p>;

    if (user === null) return <p>Erreur de chargement.</p>;

    return (
        <div className="p-6">
            <ProfilHeader user={user} />
            <ProfilPosts userId={user.id} />
        </div>
    );
}
