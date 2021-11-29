import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/userActions";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData.uuid, bio));
        setUpdateForm(false);
    }

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.username}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user" />
                    <UploadImg />
                    {/* <p>{errors.maxSize}</p>
                    <p>{errors.format}</p> */}
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>A propos</h3>
                        {updateForm === false && (
                            <>
                            <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                            <button onClick={() =>setUpdateForm(!updateForm)}>Modifier "A propos"</button>
                            </>
                        )}
                        {updateForm  && (
                            <>
                            <textarea
                                type="text"
                                defaultValue={userData.bio}
                                onChange={(e) => setBio(e.target.value)}>
                            </textarea>
                            <button onClick={handleUpdate}>Valider modification</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

};

export default UpdateProfil;