import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOffIcon from "@mui/icons-material/LocationOff";

interface MapButtonProps {
    toggleMap: () => void;
    isMapOpened: boolean;
}

export default function MapButton({ toggleMap, isMapOpened }: MapButtonProps) {

    const toggle = () => {
        toggleMap();
    };

    if (!isMapOpened) {
        return (
            <LocationOnIcon
                fontSize="large"
                style={{ position: "absolute", left: "15px", top: "15px"}}
                titleAccess="Ouvrir la carte"
                onClick={toggle}
            />
        );
    }

    return (
        <LocationOffIcon
            fontSize="large"
            style={{ position: "absolute", right: "15px", top: "15px", zIndex: "1" }}
            titleAccess="Fermer la carte"
            onClick={toggle}
        />
    );
}
