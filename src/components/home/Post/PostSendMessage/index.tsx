import './styles.css';
import Send from '../../../../assets/post/send.png'
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface Props {
  userId: number;
}

export default function PostSendMessage({userId}: Props) {

  const navigate = useNavigate()

  const HandleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/messages/${userId}`)
  }

  return (
    <div className="send-message" onClick={HandleClick}>
      <img src={Send} alt="message" />
    </div>
  )
}