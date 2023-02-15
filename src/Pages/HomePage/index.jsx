import PostShowComments from "../../Components/home/Post/PostShowComments";
import Post from "../../Components/home/Post/Post";

const user = {
  id: 1,
  name: "pablito cazino",
  picture: "pablo.jpg"
}

const plant = {
  comments: ["coucou", "oui"],
  picture: "pablo.jpg",
  id: 10
}

export default function HomePage() {
  return (
    <Post user={user} plant={plant} />
  )
}