import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

interface PostUpdateButtonProps {
  id: number;
}

export default function PostUpdateButton({ id } : PostUpdateButtonProps) {

  const navigate = useNavigate();

  const handleUpdatePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/plant/update/${id}`)
  }

  return (
    <div className='absolute right-2.5 top-2.5 bg-white p-4' style={{borderRadius: '15px'}}>
      <EditIcon onClick={handleUpdatePost}/>
    </div>
  )
}