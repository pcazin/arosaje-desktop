import './styles.css';
import { useState } from "react"
import PostProfil from './PostProfil';
import PostImage from './PostImage';
import PostComments from './PostComments';
import PostSendMessage from './PostSendMessage';
import PostShowComments from './PostShowComments';
import { useNavigate } from 'react-router-dom';
import { PostProps } from '../../../shared/PostProps';
import React from "react";

export default function Post({ data }: { data: PostProps}) {

  const navigate = useNavigate()

  /* const [showComments, setShowComments] = useState(false); */

  /* const HandleShowComments = (bool: boolean) => {
    setShowComments(bool)
  } */

  const HandleClick = () => {
    navigate(`/plant/${data.id}`)
  }

  return (
    <div className="post" onClick={HandleClick}>
      <PostProfil picture={data.photo} name={data.user.username} />
      {/* <PostShowComments onClick={HandleShowComments} show={showComments} /> */}
      <PostImage image={data.photo} />
      <PostSendMessage username={data.user.username} />
      {/*<PostComments comments={data} show={showComments} />*/}
    </div>
  )
}