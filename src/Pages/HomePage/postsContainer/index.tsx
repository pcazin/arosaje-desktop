import Post from "../../../components/home/Post";
import React from "react";

interface PostContainerProps {
  posts: React.ReactNode
}

const PostContainer = ({ posts }: PostContainerProps) => {

  console.log(posts)

  return (
    <div id="post-container">{posts}</div>
  )
};

export { PostContainer };

