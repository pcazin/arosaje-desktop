import React, { useState } from "react";
import "./styles.css";
import CloseIcon from "@mui/icons-material/Close";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query);
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value.slice(0, 30);
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div className="bar flex">
            <input
                className="searchbar w-5/6"
                style={{ height: "32px" }}
                type="text"
                value={query}
                onChange={handleChange}
            />
            <CloseIcon
                onClick={handleClear}
                className="absolute right-2 top-1.5"
            />
        </div>
    );
}