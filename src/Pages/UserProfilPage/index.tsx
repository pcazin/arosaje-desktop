import React, { useEffect, useState } from "react";
import { PostProps } from "../../shared/interfaces";
import AuthService from "../../services/AuthService";
import { UserProps } from "../../shared/interfaces";
import NoProfilePicture from "../../components/profil/NoProfilePicture";
import { useNavigate, useParams  } from "react-router-dom";

export default function UserProfilPage() {

    const navigate = useNavigate();
    const { username } = useParams();
    const [user, setUser] = useState<UserProps>();


    useEffect(() => {
        const fetchData = async () => {
            
        };

        fetchData().catch(console.error);
    }, []);

    if (!user) return "loading";

    const getProfilePicture = () => {
        if (!user.profile_picture) return <NoProfilePicture />;
        return <img src={user.profile_picture} alt="sdd" />;
    };

    return <div className="p-6">{getProfilePicture()}</div>;
}
