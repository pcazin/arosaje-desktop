import React from "react";

interface CommentProps {
    description: string;
    photo: string;
    updated_at: string;
    plant_id: number;
    user_id: number;
}

export default function Comment(comment: CommentProps) {
    return <p>{comment.description}</p>;
}
