import { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import * as CONSTANTS from "../../constants";
import authService from '../../Services/auth.service';
import './styles.css';

export default function RegisterPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const onUsernameChange = (e) => {
    const value = e.target.value
    if(value.length <= CONSTANTS.USERNAME_MAX_LENGTH) {
      setUsername(value)
    } 
  }

  const onPasswordChange = (e) => {
    const value = e.target.value
    if(value.length <= CONSTANTS.PASSWORD_MAX_LENGTH) {
      setPassword(value)
    } 
  }


  const HandleSubmit = async () => {
    // check username 
    if(username.length < CONSTANTS.USERNAME_MIN_LENGTH) {
      alert(`Le nom d'utilisateur doit faire au moins ${CONSTANTS.USERNAME_MIN_LENGTH} caractères.`)
      return;
    }
    // check password
    if(password.length < CONSTANTS.PASSWORD_MIN_LENGTH) {
      alert(`Le mot de passe doit faire au moins ${CONSTANTS.PASSWORD_MIN_LENGTH} caractères.`)
      return;
    }

    // send login request
    const result = await authService.register(username, password);

    console.log(result)
    console.log("token: " + result.token)

    if(result.token) {
      // navigate to home
      navigate("/")
    } else {
      // show the error
      alert(result)
    }
  }

  return (
    <div id="register">
      <div id="register-container">

        <h1>arosaje</h1>

        <p>Le babysitting, pour vos plantes.</p>

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

        <button 
          onClick={HandleSubmit}
        >
          s'inscrire
        </button>
      </div>
    </div>
  )
}