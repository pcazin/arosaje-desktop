import './styles.css';
import { useState } from "react"
import PostProfil from './PostProfil';
import PostImage from './PostImage';
import PostComments from './PostComments';
import PostSendMessage from './PostSendMessage';
import PostShowComments from './PostShowComments';
import { useNavigate } from 'react-router-dom';

export default function Post({user, plant}) {

  const navigate = useNavigate()

  const [showComments, setShowComments] = useState(false);

  const HandleShowComments = (bool) => {
    setShowComments(bool)
  }

  const HandleClick = () => {
    navigate(`/plant/${plant.id}`)
  }
  
  return (
    <div className="post" onClick={HandleClick}>
      <PostProfil picture={user.picture} name={user.name} />
      <PostShowComments onClick={HandleShowComments} show={showComments} />
      <PostImage image={plant.picture} />
      <PostSendMessage username={user.name} />
      <PostComments comments={plant.comments} />
    </div>
  )
}