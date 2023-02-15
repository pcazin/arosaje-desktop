import './styles.css';
import Pablo from "../../../../Assets/testDatas/pablo.jpg"
import { useNavigate } from 'react-router-dom';

export default function PostProfil({picture, name}) {

  const navigate = useNavigate();

  const HandleClick = (e) => {
    e.stopPropagation();
    navigate(`/profil/${name}`)
  }

  return (
    <div className="profil" onClick={HandleClick}>
      <img src={Pablo} alt="profil" />
      <p>{name}</p>
    </div>
  )
}