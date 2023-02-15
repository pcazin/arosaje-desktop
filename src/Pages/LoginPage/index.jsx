import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as CONSTANTS from "../../constants";
import authService from '../../Services/auth.service';
import './styles.css';

export default function LoginPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const onUsernameChange = (e) => {
    const value = e.target.value
    if (value.length <= CONSTANTS.USERNAME_MAX_LENGTH) {
      setUsername(value)
    }
  }

  const onPasswordChange = (e) => {
    const value = e.target.value
    if (value.length <= CONSTANTS.PASSWORD_MAX_LENGTH) {
      setPassword(value)
    }
  }


  const HandleSubmit = async () => {
    // check username 
    if (username.length < CONSTANTS.USERNAME_MIN_LENGTH) {
      alert(`Le nom d'utilisateur doit faire au moins ${CONSTANTS.USERNAME_MIN_LENGTH} caractères.`)
      return;
    }
    // check password
    if (password.length < CONSTANTS.PASSWORD_MIN_LENGTH) {
      alert(`Le mot de passe doit faire au moins ${CONSTANTS.PASSWORD_MIN_LENGTH} caractères.`)
      return;
    }

    // send login request
    const result = await authService.login(username, password);

    if(result.token) {
      navigate("/")
    } else {
      alert("Les identifiants ne correspondent pas.")
    }
  }

  return (
    <div id="login">
      <div id="login-container">

        <h1>arosaje</h1>

        <input
          type="text"
          name="password"
          id="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => onUsernameChange(e)}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder='Mot de passe'
          value={password}
          onChange={(e) => onPasswordChange(e)}
        />

        <a
          className='links'>
          mot de passe oublié ?
        </a>

        <NavLink
          to='/register'
          className='links'
        >
          créer un compte
        </NavLink>

        <button
          onClick={HandleSubmit}
        >
          se connecter
        </button>
      </div>
    </div>
  )
}