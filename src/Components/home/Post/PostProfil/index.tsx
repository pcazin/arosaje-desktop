import "./styles.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { UserProps } from "../../../../shared/interfaces";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AuthService from "../../../../services/AuthService";

interface Props {
    profilPictureUrl: string;
    user: UserProps;
}

export default function PostProfil({ profilPictureUrl, user }: Props) {
    const defaultProfilPictureUrl =
        "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg";

    const navigate = useNavigate();

    const HandleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        const myUserId = AuthService.getCurrentUser()?.id;
        if (myUserId === user.id) {
            navigate("/profil");
        } else {
            navigate(`/profil/${user.id}`);
        }
    };
    if (profilPictureUrl === undefined || profilPictureUrl === null) {
        profilPictureUrl = defaultProfilPictureUrl;
    }

    return (
        <div className="profil" onClick={HandleClick}>
            <img src={profilPictureUrl} alt="profil" />
            <div className="profil-info-container">
                <p>{user.username}</p>
                <div className="flex">
                    <LocationOnIcon
                        fontSize="small"
                        style={{ marginLeft: "-4px" }}
                    />
                    <p className="text-base">{user.location}</p>
                </div>
            </div>
        </div>
    );
}
