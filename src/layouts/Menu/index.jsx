import { useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";
import "./styles.css";

import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Header() {
    const navigate = useNavigate();

    const HandleNavigate = (path) => {
        if(window.location.href === "http://localhost:3000/" && path === "/") {
            window.location.href = "";
            return;
        } 
        navigate(path);
    };

    return (
        <div id="header">
            <nav>
                <ul className="flex gap-12">
                    <li>
                        <HomeIcon
                            onClick={() => HandleNavigate("/")}
                            style={{ fontSize: "50px" }}
                            alt="home"
                        />
                    </li>
                    <li>
                        <EmailIcon
                            onClick={() => HandleNavigate("/messages")}
                            style={{ fontSize: "50px" }}
                            alt="messages"
                        />
                    </li>
                    <li>
                        <AddCircleIcon
                            onClick={() => HandleNavigate("/plant/new")}
                            style={{ fontSize: "50px" }}
                            alt="new plant"
                        />
                    </li>
                    <li>
                        <AccountCircleIcon
                            onClick={() => HandleNavigate("/profil")}
                            style={{ fontSize: "50px" }}
                            alt="profil"
                        />
                    </li>
                </ul>
            </nav>
        </div>
    );
}
