import "./styles.css";
import { useState } from "react";
import PostProfil from "./PostProfil";
import PostImage from "./PostImage";
import PostComments from "./PostComments";
import PostSendMessage from "./PostSendMessage";
import PostShowComments from "./PostShowComments";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../../../shared/interfaces";
import React from "react";
import PostName from "./PostName";

interface PostInterfaceProps {
    data: PostProps;
    hiddeProfilAndMessage?: boolean;
}

export default function Post({
    data,
    hiddeProfilAndMessage,
}: PostInterfaceProps) {
    const navigate = useNavigate();

    const HandleClick = () => {
        navigate(`/plant/${data.id}`);
    };

    return (
        <div className="post" onClick={HandleClick}>
            <PostImage postPictureUrl={data.photo} />
            {!hiddeProfilAndMessage ? (
                <>
                    <PostProfil
                        profilPictureUrl={data.user.profile_picture}
                        user={data.user}
                    />
                    <PostSendMessage username={data.user.username} />
                </>
            ) : (
                <PostName name={data.name} />
            )}
        </div>
    );
}
