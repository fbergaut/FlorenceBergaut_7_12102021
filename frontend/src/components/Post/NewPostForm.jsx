import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from '../Utils';
import { NavLink } from "react-router-dom";

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    }, [userData])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className='fas fa-spinner fa-pulse'></i>
            ) : (
                <>
                <div className="data">
                    <p><span>{userData.followings ? userData.followings.length : 0}</span>{" "}Abonnement{userData.followings && userData.followings.length > 1 ? "s" : null}</p>
                    <p><span>{userData.followers ? userData.followers.length : 0}</span>{" "}Abonné{userData.followers && userData.followers.length > 1 ? "s" : null}</p>
                </div>
                <NavLink exact to="/profil">
                    <div className='user-info'>
                        <img src={userData.picture} alt="user-img" />
                    </div>
                </NavLink>
                <div className="post-form">
                    <textarea
                        name="message"
                        id="message"
                        placeholder='Quoi de neuf ?'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;
