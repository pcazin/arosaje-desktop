import React, { useState } from "react";
import PlanteService from "../../services/PlanteService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/*export default function NewPlantPage() {

    const [pictureAsPreview, setPictureAsPreview] = useState<string>();
    const [pictureAsFile, setPictureAsFile] = useState()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPictureAsPreview(URL.createObjectURL(e.target.files[0]));
        setPictureAsFile(e.target.files[0])
    } 

    const submit = () => {
        const formData = new FormData();
        formData.append("file", )
    } 
 
    return (
        <div className="flex flex-col h-full">
            <p>Nouvelle plante</p>
            <input type="file" onChange={handleChange} className="appearance-none" />
            <img src={pictureAsPreview} /> 

            <p>nom</p>
            <input type="text" />
            <p>type</p>
            <input type="text" />

            <p>type</p>
            <textarea></textarea>

            <button>submit</button>

 
        </div>
 
    );
} */

/* type Plant = {
    name: string;
    type: string;
    description: string;
    imageUrl: string;
  };
  
  type NewPlantPageProps = {
    onSubmit: (newPlant: Plant) => void;
  };
   */
const NewPlantPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
    const navigate = useNavigate()

    const onSubmit = async (
        name: string,
        type: string,
        description: string,
        imageUrl: string
    ) => {
        /* const data = {
            name: "string",
            type: "string",
            description: "string",
            latitude: "string",
            longitude: "string",
            photo: "string",
            user_id: 0,
        }; */
        const latitude = "43.566700";
        const longitude = "1.450200";

        await PlanteService.newPlant(name, type, description, imageUrl, latitude, longitude).then((_res) => {
            toast.success("Plante créée avec succès !")
            navigate("/")
        }
        ).catch(alert)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !type || !description || !imageUrl) {
            return;
        }
        onSubmit(name, type, description, imageUrl);
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

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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
};

export default NewPlantPage;
