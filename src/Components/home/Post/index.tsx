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

  const HandleClick = () => {
    navigate(`/plant/${data.id}`)
  }

  console.log(data)

  return (
    <div className="post" onClick={HandleClick}>
      <PostProfil profilPictureUrl={data.user.profile_picture} user={data.user} />
      <PostImage postPictureUrl={data.photo} />
      <PostSendMessage username={data.user.username} />
    </div>
  )
}
