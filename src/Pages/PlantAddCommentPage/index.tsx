import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanteService from "../../services/PlanteService";
import { toast } from "react-hot-toast";
import { UserProps } from "../../shared/interfaces";
import AuthService from "../../services/AuthService";

export default function PlantAddCommentPage() {
    const { plantId, userId } = useParams();
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const navigate = useNavigate();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const user: UserProps | null = AuthService.getCurrentUser();

        if (!user) {
            AuthService.clearStorage();
            toast.error("Vous devez être botaniste pour ajouter un commentaire sur ce poste.")
            navigate("/login");
            return;
        }

        if(user?.role !== "botaniste") {
          toast.error("Vous devez être botaniste pour ajouter un commentaire sur ce poste.")
          return;
        }

        await PlanteService.newComment(
            description,
            imageUrl,
            Number(plantId),
            Number(user.id)
        )
            .then((res) => {
                console.log(res);
                toast.success("Commentaire ajouté avec succès.");
                navigate(`/plant/${plantId}`);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Une erreur s'est produite.");
            });
    };

    return (
        <div className="p-6">
            <h1
                className="mt-12 m-0 text-center capitalize font-italiana"
                style={{ fontSize: "30px", fontWeight: "600" }}
            >
                Nouveau commentaire
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 mt-16">
                <div className="flex flex-col mt-12">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Message
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        rows={3}
                        required
                        value={description}
                        onChange={handleDescriptionChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                        autoComplete="off"
                    ></textarea>
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="nom"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        url de l'image en attendant
                    </label>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        value={imageUrl}
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-700 text-white rounded-lg py-2 px-4 text-sm font-medium focus:outline-none focus:ring focus:ring-green-700"
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
}
