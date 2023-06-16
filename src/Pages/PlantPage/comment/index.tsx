import React from "react";
import { CommentProps } from "../../../shared/interfaces";

export default function Comment({
    description,
    photo,
    updated_at,
    plant_id,
    user_id,
}: CommentProps) {
    console.log(`Comment ${plant_id} created`)
    return <p>{description}</p>;
}
