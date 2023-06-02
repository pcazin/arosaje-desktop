import React, { useEffect, useState } from "react";
import { PostProps } from "../../shared/PostProps";
import AuthService from "../../services/AuthService";
import { UserProps } from "../../shared/UserProps";
import NoProfilePicture from "../../components/profil/NoProfilePicture";

export default function ProfilPage() {
    const [user, setUser] = useState<UserProps>();

    useEffect(() => {
        const fetchData = async () => {
            const user: UserProps | null = AuthService.getCurrentUser();

            if (!user) {
                AuthService.logout();
                return;
            } else {
                setUser(user as UserProps);
            }
        };

        fetchData().catch(console.error);
    }, []);

    if (!user) return "loading";

    console.log(user);

    const getProfilePicture = () => {
        console.log(user.profile_picture);
        if (!user.profile_picture) return <NoProfilePicture />;
        return <img src={user.profile_picture} alt="sdd" />;
    };

    return <div id="profil-container">{getProfilePicture()}</div>;
}
