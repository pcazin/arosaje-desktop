import React from 'react';
import { PostProps } from '../../../shared/interfaces';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';

interface PlantPageUserProfilProps {
  user: PostProps["user"]
}

export default function PlantPageUserProfil({ user } : PlantPageUserProfilProps) {

  const navigate = useNavigate()

  const handleProfilClick = () => {
    const myUserId = AuthService.getCurrentUser()?.id
    if(myUserId === user.id) {
      navigate("/profil")
    } else {
      navigate(`/profil/${user.id}`)
    }
  }

  return (
    <div className="flex w-fit" onClick={handleProfilClick}>
                <img
                    className="w-14 rounded-md"
                    src={user.profile_picture}
                    alt="photo de profil"
                />
                <div className="flex flex-col ml-2">
                    <p className="text-xl">{user.username}</p>
                    <p>
                        <LocationOnIcon
                            fontSize="small"
                            style={{ marginLeft: "-2px" }}
                        />
                        {user.location}
                    </p>
                </div>
            </div>
  )
}