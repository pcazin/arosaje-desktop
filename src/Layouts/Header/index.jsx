import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';
import './styles.css';
import Logout from '../../assets/header/logout.png';
import Profil from '../../assets/header/profil.png';
import Messages from "../../assets/header/messages.png";


export default function Header() {

  const navigate = useNavigate();

  const HandleLogout = () => {
    authService.logout();
    navigate("/login")
  }

  const HandleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div id='header'>
      <nav>
        <ul>
          <li>
           <img src={Messages} onClick={() => HandleNavigate("/messages")} alt='messages' />
          </li>
          <li>
            <NavLink to="/" id='title'>arosa<span>je</span></NavLink>
          </li>
          <li>
            <img src={Profil} onClick={() => HandleNavigate("/profil")} alt='profil' />
          </li>
        </ul>
      </nav>
      <img src={Logout} onClick={HandleLogout} id='logout' alt='logout' />
    </div>
  )
}