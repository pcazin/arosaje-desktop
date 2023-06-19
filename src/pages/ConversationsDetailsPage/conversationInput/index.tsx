import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import MessageService from "../../../services/MessageService";

interface ConversationInputProps {
    onSubmit: (value: string) => void;
}

export default function ConversationInput({
    onSubmit
}: ConversationInputProps) {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {

        if (inputValue.length === 0) {
            toast.error("Vous devez d'abbord entrer un message.");
            return;
        }

        onSubmit(inputValue);
        setInputValue("");
    };

    const handleKeyDown = (event: any) => {
        if(event.code === "Enter") {
            handleSubmit()
        }
    }

    return (
        
            <div className="w-4/5 h-12 flex justify-center absolute bottom-28 overflow-hidden">
                <input
                    type="text"
                    required
                    value={inputValue}
                    onChange={handleInputChange}
                    className="rounded-l top-0 w-2/3 h-full border-2 border-gray-300 py-2 px-4 mb-2 focus:outline-none focus:ring focus:ring-green-700 r-0"
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                />

                <button
                    onClick={handleSubmit}
                    className="rounded-r top-0 h-full bg-green-700 text-white py-2 px-4 text-sm font-medium focus:outline-none focus:ring focus:ring-green-700 w-1/3 right-0"
                >
                    Envoyer
                </button>
            </div>
        
    );
}
