import './styles.css';
import { useNavigate } from 'react-router-dom';
import React from "react";

export default function PostProfil({picture, name}) {

  const navigate = useNavigate();

  const HandleClick = (e) => {
    e.stopPropagation();
    navigate(`/profil/${name}`)
  }

  return (
    <div className="profil" onClick={HandleClick}>
      <img alt="profil" />
      <p>{name}</p>
    </div>
  )
}