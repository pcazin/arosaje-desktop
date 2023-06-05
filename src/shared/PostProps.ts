import { UserProps } from "./UserProps";

export interface PostProps {
    name: string,
    type: string,
    description: string,
    latitude: string,
    longitude: string,
    photo: string,
    id: number,
    created_at: string,
    updated_at: null | string,
    user: UserProps
  }