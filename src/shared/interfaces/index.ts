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

export { PostProps, UserProps };