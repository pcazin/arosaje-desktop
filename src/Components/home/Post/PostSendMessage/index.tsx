import './styles.css';
import Send from '../../../../assets/post/send.png'
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface Props {
  username: string;
}

export default function PostSendMessage({username}: Props) {

  const navigate = useNavigate()

  const HandleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/messages/${username}`)
  }

  return (
    <div className="send-message" onClick={HandleClick}>
      <img src={Send} alt="message" />
    </div>
  )
}