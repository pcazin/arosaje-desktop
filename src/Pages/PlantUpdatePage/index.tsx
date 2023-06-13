import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanteService from "../../services/PlanteService";
import { PostProps } from "../../shared/interfaces";
import AuthService from "../../services/AuthService";
import { toast } from "react-hot-toast";

export default function PlantUpdatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");


    useEffect(() => {
        const fetchData = async () => {
            PlanteService.getPlantById(Number(id))
                .then((res) => {
                    console.log(res.data);
                    setName(res.data.name);
                    setType(res.data.type);
                    setDescription(res.data.description);
                    setImageUrl(res.data.photo);
                    setLatitude(res.data.latitude);
                    setLongitude(res.data.longitude);
                })
                .catch(() => {
                    toast.error("Erreur chargement des données.");
                    AuthService.clearStorage();
                    navigate("/login");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        fetchData();
    }, []);

    const onSubmit = async (
      name: string,
      type: string,
      description: string,
      imageUrl: string
  ) => {

      await PlanteService.updatePlant(
          Number(id),
          name,
          type,
          description,
          imageUrl,
          latitude,
          longitude
      )
          .then((_res) => {
              toast.success("Plante modifiée avec succès !");
              navigate("/");
          })
          .catch((error) => {
              console.error(error);
              toast.error("Erreur de modification ! Réessayez plus tard.");
              navigate("/login");
          });
  };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !type || !description || !imageUrl) {
            return;
        }
        onSubmit(name, type, description, imageUrl);
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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        /* const file = event.target.files![0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setImagePreviewUrl(reader.result as string);
    setImageUrl(file);
  };

  reader.readAsDataURL(file); */
        setImageUrl(event.target.value);
    };

    if (isLoading)
        return <p className="text-center">Chargement des données.</p>;

    return (
        <div className="p-6">
            <h1
                className="font-italiana text-center"
                style={{ fontSize: "50px" }}
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
                <div className="flex flex-col">
                    {/* <label
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
        /> */}
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
                        required
                        value={imageUrl}
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                    />
                </div>
                {imagePreviewUrl && (
                    <img
                        src={imagePreviewUrl}
                        alt="Plant preview"
                        className="w-32"
                    />
                )}
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
}
