import "./styles.css";
import { useState } from "react";
import PostProfil from "./PostProfil";
import PostImage from "./PostImage";
import PostComments from "./PostComments";
import PostSendMessage from "./PostSendMessage";
import PostShowComments from "./PostShowComments";
import { useNavigate } from "react-router-dom";
import { PostProps, UserProps } from "../../../shared/interfaces";
import React from "react";
import PostName from "./PostName";
import PostUpdateButton from "./PostUpdateButton";
import AuthService from "../../../services/AuthService";
import { toast } from "react-hot-toast";

interface PostInterfaceProps {
    data: PostProps;
    hiddeProfilAndMessage?: boolean;
    showUpdateButton?: boolean;
}

export default function Post({
    data,
    hiddeProfilAndMessage,
    showUpdateButton
}: PostInterfaceProps) {
    const navigate = useNavigate();

    const HandleClick = () => {
        navigate(`/plant/${data.id}`);
    };

    const HandleUpdateClick = () => {
        navigate(`/plant/update/${data.id}`);
    }

    const user: UserProps | null = AuthService.getCurrentUser();

    if(!user) {
        navigate("/login");
        return null;
    }

    const myUserId = user.id;

    return (
        <div className="post" onClick={HandleClick}>
            <PostImage postPictureUrl={data.photo} />
            {!hiddeProfilAndMessage ? (
                <>
                    <PostProfil
                        profilPictureUrl={data.user.profile_picture}
                        user={data.user}
                    />
                    {data.user.id !== myUserId ? <PostSendMessage userId={data.user.id} /> : null}
                </>
            ) : (
                <PostName name={data.name} />
            )}

            { showUpdateButton ? <PostUpdateButton id={data.id} /> : null}
        </div>
    );
}
