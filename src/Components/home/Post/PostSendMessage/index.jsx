import './styles.css';
import Send from '../../../../Assets/post/send.png'
import { useNavigate } from 'react-router-dom';

export default function PostSendMessage({username}) {

  const navigate = useNavigate()

  const HandleClick = (e) => {
    e.stopPropagation();
    navigate(`/messages/${username}`)
  }

  return (
    <div className="send-message" onClick={HandleClick}>
      <img src={Send} alt="message" />
    </div>
  )
}