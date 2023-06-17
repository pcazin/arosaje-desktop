interface CommentProps {
    description: string;
    photo: string;
    updated_at: string;
    plant_id: number;
    user: UserProps;
    id?: number;
}

interface PostProps {
    name: string;
    type: string;
    description: string;
    latitude: string;
    longitude: string;
    photo: string;
    id: number;
    created_at: string;
    updated_at: null | string;
    user: UserProps;
    comments: CommentProps[];
    gardening_service: any;
}

interface UserProps {
    username: string;
    bio: string;
    location: string;
    profile_picture: string;
    role: string;
    updated_at: string;
    id: number;
    created_at: string;
}

export { PostProps, UserProps, CommentProps };