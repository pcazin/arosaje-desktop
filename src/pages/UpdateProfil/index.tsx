import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { UserProps } from "../../shared/interfaces";
import { toast } from "react-hot-toast";
import UserService from "../../services/UserService";

export default function UpdateProfil() {
    const navigate = useNavigate();

    const [id, setId] = useState<number>();
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [profilPicture, setProfilPicture] = useState("");

    const [toggle, setToggle] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value.slice(0, 15));
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value.slice(0, 15).trim().toLowerCase());
    };

    const handleLocationChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLocation(event.target.value.slice(0, 30).trim().toLowerCase());
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value.slice(0, 100));
    };

    const handleProfilPicture = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProfilPicture(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!id) {
            console.error("id is required for update.");
            AuthService.clearStorage();
            toast.error("No id foudn for modified user.");
            navigate("/login");
            return;
        }

        // maybe add updated_at
        await UserService.updateUser(
            id,
            username,
            bio,
            location,
            profilPicture,
            toggle ? "botanist" : "user",
            password
        )
            .then((res) => {
                console.log("new user");
                console.log(res);
                toast.success("Modification réussie.");
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/profil");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Une erreur est survenue.");
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            const user: UserProps | null = AuthService.getCurrentUser();

            if (!user) {
                toast.error(
                    "Vous devez être connecté pour modifier votre profil."
                );
                AuthService.clearStorage();
                navigate("/login");
                return;
            } else {
                setId(user.id);
                setBio(user.bio);
                setUsername(user.username);
                setLocation(user.location);
                setProfilPicture(user.profile_picture);
                setToggle(user.role === "user" ? false : true);
                setIsLoading(false);
            }
        };

        fetchData().catch(console.error);
    }, []);

    if (isLoading)
        return <p className="text-center">Chargement des données...</p>;

    return (
        <div className="p-6 pb-40">
            <h1 className="mt-12 m-0 text-center capitalize font-italiana">
                Arosaje
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6 mt-16">
                <div className="flex flex-col">
                    <label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Nom d'utilisateur
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        value={username}
                        onChange={handleUsernameChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                        autoComplete="off"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="location"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        ville
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        required
                        value={location}
                        onChange={handleLocationChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                        autoComplete="off"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="bio"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        bio
                    </label>
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        required
                        value={bio}
                        onChange={handleBioChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                        autoComplete="off"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="profilPicture"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Lien photo de profil
                    </label>
                    <input
                        type="text"
                        name="profilPicture"
                        id="profilPicture"
                        required
                        value={profilPicture}
                        onChange={handleProfilPicture}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                        autoComplete="off"
                    />
                </div>

                <div className="flex h-14 items-center gap-x-8">
                    <p>Vous êtes botaniste ?</p>
                    <button
                        className={`w-14 h-8 rounded-full p-1 ${
                            toggle ? "bg-green-700" : "bg-gray-300"
                        }`}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          e.preventDefault();
                          setToggle(!toggle)
                        }}
                    >
                        <span
                            className={`block w-6 h-6 bg-white rounded-full shadow-md transform ${
                                toggle ? "translate-x-6" : ""
                            }`}
                        ></span>
                    </button>
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700"
                        autoComplete="off"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-700 text-white rounded-lg py-2 px-4 text-sm font-medium focus:outline-none focus:ring focus:ring-green-700"
                >
                    Valider
                </button>
            </form>
        </div>
    );
}
