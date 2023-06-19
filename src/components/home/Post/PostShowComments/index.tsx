import './styles.css';
import Chevron from '../../../../assets/post/chevron.png';
import React from "react";

interface Props {
  onClick: (bool: boolean) => void;
  show: boolean;
}

export default function PostShowComments({onClick, show}: Props) {

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
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
