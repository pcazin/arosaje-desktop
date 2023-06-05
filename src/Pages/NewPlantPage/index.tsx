import React, { useState } from "react";

export default function NewPlantPage() {

    /* const [pictureAsPreview, setPictureAsPreview] = useState<string>();
    const [pictureAsFile, setPictureAsFile] = useState()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPictureAsPreview(URL.createObjectURL(e.target.files[0]));
        setPictureAsFile(e.target.files[0])
    } 

    const submit = () => {
        const formData = new FormData();
        formData.append("file", )
    } */
 
    return (
        <div className="flex flex-col h-full">
            <p>Nouvelle plante</p>
            {/* <input type="file" onChange={handleChange} className="appearance-none" />
            <img src={pictureAsPreview} /> */}

            <p>nom</p>
            <input type="text" />
            <p>type</p>
            <input type="text" />

            <p>type</p>
            <textarea></textarea>

            <button>submit</button>

 
        </div>
 
    );
}