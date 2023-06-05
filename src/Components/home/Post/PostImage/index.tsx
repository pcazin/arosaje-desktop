import './styles.css';
import React from 'react';

interface Props {
  postPictureUrl: string;
}

export default function PostImage({postPictureUrl}: Props) {
  return (
    <img src={postPictureUrl} alt="plant" className='post-image'/>
  )
}