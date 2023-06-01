import './styles.css';
import Plant from "../../../../Assets/post/plant.jpg";

export default function PostImage({image}) {
  return (
    <img src={Plant} alt="plant" className='post-image'/>
  )
}