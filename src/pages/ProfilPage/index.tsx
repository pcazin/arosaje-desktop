import React, { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import { UserProps } from "../../shared/interfaces";
import { useNavigate } from "react-router-dom";
import ProfilHeader from "../../shared/components/ProfilHeader";
import ProfilButtons from "./profilButtons";
import ProfilPosts from "./profilPosts";

export default function ProfilPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProps>();

    useEffect(() => {
        const fetchData = async () => {
            const user: UserProps | null = AuthService.getCurrentUser();

            if (!user) {
                AuthService.clearStorage();
                navigate("/login");
                return;
            } else {
                setUser(user as UserProps);
            }
        };

        fetchData().catch(console.error);
    }, []);

    if (!user) return <p className="text-center">loading</p>;

    console.log("user laaaa")
    console.log(user)

    return <div className="p-6">
        <ProfilHeader user={user}/>
        <ProfilButtons />
        <ProfilPosts userId={user.id} showUpdateButton={true}/>
    </div>;
}
