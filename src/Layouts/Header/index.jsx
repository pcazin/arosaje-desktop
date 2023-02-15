import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../Services/auth.service';
import './styles.css';
import Logout from '../../Assets/header/logout.png';
import Profil from '../../Assets/header/profil.png';
import Messages from "../../Assets/header/messages.png";


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