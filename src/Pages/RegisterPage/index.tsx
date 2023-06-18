import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import authService from "../../services/AuthService";
import "./styles.css";
import React from "react";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [profilPicture, setProfilPicture] = useState("");

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

        // send register request
        const result = await authService.register(
            username,
            password,
            location,
            bio,
            profilPicture
        );

        if (result.token) {
            // navigate to home
            navigate("/");
        } else {
            // show the error
            alert("Erreur de création, essayer avec d'autres identifiants.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="mt-12 m-0 text-center capitalize font-italiana">
                Arosaje
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6 mt-16">
                <div className="flex flex-col">
                    <label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        username
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
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        password
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

                <NavLink to="/login" className="links">
                    Déjà utilisateur ? Se connecter
                </NavLink>

                <button
                    type="submit"
                    className="bg-green-700 text-white rounded-lg py-2 px-4 text-sm font-medium focus:outline-none focus:ring focus:ring-green-700"
                >
                    Inscription
                </button>
            </form>
        </div>
    );
}
