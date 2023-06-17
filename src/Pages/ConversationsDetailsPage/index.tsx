import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MessageService from '../../services/MessageService';
import { UserProps } from '../../shared/interfaces';
import AuthService from '../../services/AuthService';
import toast from 'react-hot-toast';

export default function HomePage() {

  const { userId } = useParams()
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {

    const currentUser: UserProps | null = AuthService.getCurrentUser()

    if(!currentUser) {
      console.error("Aucun utilisateur trouvé.")
      toast.error("Aucun utilisateur trouvé.")
      AuthService.clearStorage();
      navigate("/login");
    }

    MessageService.getConversation(Number(userId), Number(currentUser?.id))
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
      navigate(`/messages/first-message/${userId}`)
    })
    .finally(() => {
      setisLoading(false);
    })
  }, [])

  if(isLoading) return <p className="text-center">Chargement des données...</p>

  return (
    <p>Conversation avec user {userId}</p>
  )
}