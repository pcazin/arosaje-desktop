import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilButtons() {

    const navigate = useNavigate();

    const handleNewPost = () => {
        navigate("/plant/new");
    }

    const handleModifyProfil = () => {
        navigate("update")
    }

    return (
        <div className="p-6 flex flex-row justify-center gap-8">
            <div className="p-2 border-slate-300 border-2 rounded-md font-medium" onClick={handleNewPost}>
                nouveau post
            </div>
            <div className="p-2 border-slate-300 border-2 rounded-md font-medium" onClick={handleModifyProfil}>
                modifier profil
            </div>
        </div>
    );
}
