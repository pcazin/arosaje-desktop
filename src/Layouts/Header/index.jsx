import { NavLink } from 'react-router-dom';
import authService from '../../Services/auth.service';
import './styles.css';

export default function Header() {
  return (
    <div id='header'>
      <nav>
        <ul>
          <li>
            <NavLink to="/">arosaje</NavLink>
          </li>
          <li>
          <NavLink to="/messages">messages</NavLink>
          </li>
          <li>
          <NavLink to="/profil">profil</NavLink>
          </li>
          <li>
          { authService.isConnected() ? "déconnexion" : "connexion" }
          </li>
        </ul>
      </nav>
    </div>
  )
}