import React from 'react';

interface PostNameProps {
  name: string;
}

export default function PostName({ name } : PostNameProps) {
  return (
    <div className='absolute left-2.5 top-2.5 bg-white p-4' style={{borderRadius: '15px'}}>
      <p className='text-black font-medium'>{name}</p>
    </div>
  )
}