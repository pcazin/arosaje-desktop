import Post from "../../components/home/Post/index.js";
import SearchBar from "../../components/home/searchBar/index.js";
import PlanteService from "../../services/PlanteService.js";
import "./styles.css";
import { useEffect, useState } from "react";
import { PostProps } from "../../shared/PostProps.js";
import React from "react";

export default function HomePage() {

  const [data, setData] = useState<PostProps[] | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      const res: PostProps[] = await PlanteService.getFeed();
      const dazta 
      console.log(data.data)
      setData(data.data)
    };

    fetchData().catch(console.error);
  }, []);

  if (!data) return "loading";

  const posts = data.map((post) => <Post data={post} />);

  return (
    <div id="home">
      <SearchBar />
      <div id="post-container">{posts}</div>
    </div>
  );
}
