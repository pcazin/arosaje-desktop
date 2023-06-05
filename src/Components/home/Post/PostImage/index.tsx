import './styles.css';
import Plant from "../../../../assets/post/plant.jpg";
import React from 'react';

interface Props {
  image: string;
}

export default function PostImage({image}: Props) {
  return (
    <img src={Plant} alt="plant" className='post-image'/>
  )
}