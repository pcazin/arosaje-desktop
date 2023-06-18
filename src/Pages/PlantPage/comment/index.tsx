import React from "react";
import { CommentProps } from "../../../shared/interfaces";
import { DateToDayMonth } from "../../../utils/Date";

export default function Comment({
    description,
    photo,
    updated_at,
    plant_id,
    user,
}: CommentProps) {
    return (
        <div className="mt-4">
            
            <div className="flex gap-x-2 items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={user.profile_picture} alt="photo de profil" />
                </div>
                <p className="text-lg">{user.username} -</p>
                <p className="text-lg">{DateToDayMonth(updated_at)}</p>
            </div>

            <p className="text-justify">{description}</p>
            
            {photo ? <img className="rounded-md mt-1" src={photo} alt="photo de la plante" /> : null}
        </div>
    )
}
