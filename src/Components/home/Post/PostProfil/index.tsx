import './styles.css';
import { useNavigate } from 'react-router-dom';
import React from "react";
import { UserProps } from '../../../../shared/UserProps';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Props {
  profilPictureUrl: string;
  user: UserProps;
}

export default function PostProfil({profilPictureUrl, user}: Props) {

  const navigate = useNavigate();

  const HandleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/profil/${user.username}`)
  }

  return (
    <div className="profil" onClick={HandleClick}>
      <img src={profilPictureUrl} alt="profil" />
      <div className='profil-info-container'>
        <p>{user.username}</p> 
        <div className="flex">
          <LocationOnIcon fontSize='small' style={{marginLeft: "-4px"}}/>
          <p className='text-base'>{user.location}</p>
        </div>
      </div>
    </div>
  )
}