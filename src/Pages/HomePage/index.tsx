import Post from "../../components/home/Post";
import SearchBar from "../../components/home/searchBar";
import PlanteService from "../../services/PlanteService";
import "./styles.css";
import { useEffect, useState } from "react";
import { PostProps } from "../../shared/PostProps.js";
import React from "react";

export default function HomePage() {

  const [data, setData] = useState<PostProps[] | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      const res = await PlanteService.getFeed();
      const data: PostProps[] = res.data;
      setData(data)
    };

    fetchData().catch(console.error);
  }, []);

  if (!data) return "loading";

  const posts = data.map((post, index) => <Post data={post} key={index} />);

  return (
    <div id="home">
      <SearchBar />
      <div id="post-container">{posts}</div>
    </div>
  );
}
