import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { UserProps } from "../../../shared/interfaces";
import toast from "react-hot-toast";

interface NewCommentButtonProps {
    plantId: number;
    userId: number;
}

export default function NewCommentButton({
    plantId,
    userId,
}: NewCommentButtonProps) {
    const navigate = useNavigate();

    const handleAddComment = () => {
        const user: UserProps | null = AuthService.getCurrentUser();

        if (!user || user.role !== "botanist") {
            AuthService.clearStorage();
            toast.error(
                "Vous devez être botaniste pour ajouter un commentaire sur ce poste."
            );
            return;
        }

        navigate(`/plant/${plantId}/comment/add/${userId}`);
    };

    return (
        <button
            className="lowercase p-2 rounded-md font-medium border-solid border-2 border-green-700 
          
      "
            onClick={handleAddComment}
        >
            Ajouter un commentaire
        </button>
    );
}
