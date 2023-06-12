import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as CONSTANTS from "../../constants";
import authService from "../../services/AuthService";
import "./styles.css";
import React from "react";

export default function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await authService.login(username, password);

        if (result.token) {
            navigate("/");
        } else {
            alert("Les identifiants ne correspondent pas.");
        }
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event?.target.value.slice(0, 15).toLowerCase());
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event?.target.value.slice(0, 15).toLowerCase());
    };

    return (
        <div className="p-6">
            <h1 className="mt-32 m-0 text-center capitalize font-italiana">Arosaje</h1>
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
                <NavLink to="/register" className="links">
                    Créer un compte
                </NavLink>
                <button
                    type="submit"
                    className="bg-green-700 text-white rounded-lg py-2 px-4 text-sm font-medium focus:outline-none focus:ring focus:ring-green-700"
                >
                    Connexion
                </button>
            </form>
        </div>
    );
}
