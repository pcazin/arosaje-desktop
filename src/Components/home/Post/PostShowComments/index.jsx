import './styles.css';
import Chevron from "../../../../Assets/post/chevron.png";
import { useState } from 'react';

export default function PostShowComments({onClick, show}) {

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(!show)
  }
 
  return (
    <div className='post-open-comments' onClick={handleClick}>
      <div className={`chevron-wrapper ${show ? 'rotate' : ''}`}>
        <img src={Chevron} className='chevron' />
      </div>
    </div>
  )
}
