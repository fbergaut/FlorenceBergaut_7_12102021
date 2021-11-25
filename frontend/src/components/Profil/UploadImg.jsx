import React, { useState } from "react";

const UploadImg = () => {
    const [file, setFile] = useState();

    const handlePicture = (e) => {
        e.preventDefault();
    }

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer d'image</label>
            <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])}/>
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    )
};

export default UploadImg;