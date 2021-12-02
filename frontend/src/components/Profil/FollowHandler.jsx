import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollow = () => {
        
    }

    const handleUnfollow = () => {
        
    }

    useEffect(() => {
        if (!isEmpty(userData.followings)) {
            const uuid = userData.followings.map((id)=>{
                const idAbonnements = id.followingUuid;
                return idAbonnements;
            });
            console.log(uuid);
            if (uuid.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
        }

    }, [userData, idToFollow])

    return (
        <>
            {isFollowed && (
                <span>
                    <button className="unfollow-btn">Abonné</button>
                </span>
            )}
            {isFollowed === false && (
                <span>
                    <button className="follow-btn">Suivre</button>
                </span>
            )}
        </>
    );
};

export default FollowHandler;