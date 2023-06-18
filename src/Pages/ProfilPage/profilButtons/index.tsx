import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";

export default function ProfilButtons() {
    const navigate = useNavigate();

    const handleNewPost = () => {
        navigate("/plant/new");
    };

    const handleModifyProfil = () => {
        navigate("update");
    };

    const handleLogout = () => {
        AuthService.clearStorage();
        navigate("/login");
    };

    return (
        <div className="w-100 flex justify-center mb-6">
            <div className="flex flex-col w-64 gap-2">
                <div className="flex flex-row justify-between w-100">
                    <div
                        className="p-2 border-slate-300 border-2 rounded-md font-medium"
                        onClick={handleNewPost}
                    >
                        nouveau post
                    </div>
                    <div
                        className="p-2 border-slate-300 border-2 rounded-md font-medium"
                        onClick={handleModifyProfil}
                    >
                        modifier profil
                    </div>
                </div>
                <div
                    className="p-2 border-slate-300 border-2 rounded-md font-medium w-100 flex justify-center text-red-700"
                    onClick={handleLogout}
                >
                    déconnexion
                </div>
            </div>
        </div>
    );
}
