import React from "react";
import { UserProps } from "../../interfaces";

interface ProfilHeaderProps {
    user: UserProps;
}

export default function ProfilHeader({ user }: ProfilHeaderProps) {
    return (
        <div className="p-6 flex flex-col">
            <div className="flex flex-row justify-start items-center">
                <img src={user.profile_picture} alt="photo de profil" className="w-20 rounded-full"/>
                <div className="flex flex-col ml-8 text-center">
                    <p className="font-bold">4</p>
                    <p className="font-medium">publications</p>
                </div>
                <div className="flex flex-col text-center ml-6">
                    <p className="font-bold">2</p>
                    <p className="font-medium">commentaires</p>
                </div>
            </div>
            <p className="text-3xl mt-6">{user.username}</p>
            <p className="text-slate-400 font-bold mt-1">{user.role}</p>
            <p className="mt-1 text-justify">{user.bio}</p>
        </div>
    );
}
