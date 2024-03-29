import React from "react";
import { UserProps } from "../../interfaces";
import { divIcon } from "leaflet";

interface ProfilHeaderProps {
    user: UserProps;
}

export default function ProfilHeader({ user }: ProfilHeaderProps) {
    const defaultProfilPic = "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
    return (
        <div className="p-6 flex flex-col">
            <div className="flex flex-row justify-start items-center">
                <img
                    src={
                        user.profile_picture
                            ? user.profile_picture
                            : defaultProfilPic
                    }
                    alt="photo de profil"
                    className="w-20 rounded-full"
                />

                <div className="flex flex-col ml-8 text-center">
                    <p className="font-bold">
                        {localStorage.getItem("counts") !== null ? JSON.parse(localStorage.getItem("counts") as string).plants : 0}
                    </p>
                    <p className="font-medium">publications</p>
                </div>
                <div className="flex flex-col text-center ml-6">
                    <p className="font-bold">
                    {localStorage.getItem("counts") !== null ? JSON.parse(localStorage.getItem("counts") as string).comments : 0}

                    </p>
                    <p className="font-medium">commentaires</p>
                </div>
            </div>
            <p className="text-3xl mt-6">{user.username}</p>
            <p className="text-slate-400 font-bold mt-1">{user.role}</p>
            <p className="mt-1 text-justify">{user.bio}</p>
        </div>
    );
}
