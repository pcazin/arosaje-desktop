import './styles.css';
import { useNavigate } from 'react-router-dom';
import React from "react";

interface Props {
  picture: string;
  name: string;
}

export default function PostProfil({picture, name}: Props) {

  const navigate = useNavigate();

  const HandleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/profil/${name}`)
  }

  return (
    <div className="profil" onClick={HandleClick}>
      <img src={picture} alt="profil" />
      <p>{name}</p>
    </div>
  )
}