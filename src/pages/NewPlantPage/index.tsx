import React, { useState } from "react";
import PlanteService from "../../services/PlanteService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewPlantPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const onSubmit = (
        name: string,
        type: string,
        description: string,
        imageFile: File | null
    ) => {
        if (!imageFile) {
            toast.error("Please select an image");
            return;
        }

        let formData = new FormData();
        formData.append("image", imageFile, imageFile.name)

        const location = generateRandomCoordinatesInFrance();
        const latitude: string = location.latitude.toString();
        const longitude: string = location.longitude.toString();

        PlanteService.newPlant(
            name,
            type,
            description,
            formData,
            latitude,
            longitude
        )
            .then((_res) => {
                toast.success("Plante créée avec succès !");
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erreur de création ! Réessayez plus tard.");
                navigate("/login");
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !type || !description || !imageFile) {
            return;
        }
        onSubmit(name, type, description, imageFile);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];


            setImageFile(selectedFile);
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(event.target.value);
    };

    const generateRandomCoordinatesInFrance = (): {
        latitude: number;
        longitude: number;
    } => {
        // Bounds of France
        const minLatitude = 41.333;
        const maxLatitude = 51.124;
        const minLongitude = -5.559;
        const maxLongitude = 9.662;

        // Generate random latitude and longitude within the bounds
        const latitude =
            Math.random() * (maxLatitude - minLatitude) + minLatitude;
        const longitude =
            Math.random() * (maxLongitude - minLongitude) + minLongitude;

        return { latitude: latitude, longitude: longitude };
    };

    return (
        <div className="p-6">
            <h1
                className="mt-12 m-0 text-center capitalize font-italiana"
                style={{ fontSize: "30px", fontWeight: "600" }}
            >
                Nouvelle plante
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6 mt-16">
                <div className="flex flex-col">
                    <label
                        htmlFor="nom"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Nom
                    </label>
                    <input
                        type="text"
                        name="nom"
                        id="nom"
                        required
                        value={name}
                        onChange={handleNameChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                        autoComplete="off"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="type"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Type
                    </label>
                    <input
                        type="text"
                        name="type"
                        id="type"
                        required
                        value={type}
                        onChange={handleTypeChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                        autoComplete="off"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
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
                {imagePreviewUrl && (
                    <img
                        src={imagePreviewUrl}
                        alt="Plant preview"
                        className="w-32"
                    />
                )}
                <div className="flex flex-col">
                    <label
                        htmlFor="image"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        required
                        accept="image/*"
                        onChange={handleImageChange}
                        className="py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-700 text-white rounded-lg py-2 px-4 text-sm font-medium focus:outline-none focus:ring focus:ring-green-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPlantPage;
