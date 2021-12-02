import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/userActions";
import LeftNav from "../LeftNav";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

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
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={()=>setFollowingPopup(true)}>
                        Abonnements : {userData.followings ?userData.followings.length : ""}
                    </h5>
                    <h5 onClick={()=>setFollowersPopup(true)}>
                        Abonnés : {userData.followers ?userData.followers.length : ""}
                    </h5>
                </div>
            </div>
            {followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={()=>setFollowingPopup(false)}>
                            &#10005;
                        </span>
                        <ul>
                            {usersData.map((user) => {
                                for(let i = 0; i < userData.followings.length; i++) {
                                    if (user.uuid === userData.followings[i].followingUuid) {
                                         console.log(user.uuid);
                                        return (
                                            <li key={user.uuid}>
                                                <img src={user.picture} alt="user-pic" />
                                                <h4>{user.username}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user.uuid}/>
                                                </div>
                                                
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span className="cross" onClick={()=>setFollowersPopup(false)}>
                            &#10005;
                        </span>
                        <ul>
                            {usersData.map((user) => {
                                for(let i = 0; i < userData.followers.length; i++) {
                                    if (user.uuid === userData.followers[i].followersUuid) {
                                        console.log(user.uuid);
                                        return (
                                            <li key={user.uuid}>
                                                <img src={user.picture} alt="user-pic" />
                                                <h4>{user.username}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user.uuid}/>
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
            
        </div>
    )

};

export default UpdateProfil;