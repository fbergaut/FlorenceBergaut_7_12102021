import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userActions";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData.uuid, idToFollow));
        setIsFollowed(true);
    };

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData.uuid, idToFollow));
        setIsFollowed(false);
    };

    useEffect(() => {
        if (!isEmpty(userData.followings)) {
            const uuid = userData.followings.map((id)=>{
                const idAbonnements = id.followingUuid;
                console.log(idAbonnements);
                return idAbonnements;
            });
            if (uuid.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
        }

    }, [userData, idToFollow])

    return (
        <>
            {isFollowed && (
                <span onClick={handleUnfollow}>
                    <button className="unfollow-btn">Abonné</button>
                </span>
            )}
            {isFollowed === false && (
                <span onClick={handleFollow}>
                    <button className="follow-btn">Suivre</button>
                </span>
            )}
        </>
    );
};

export default FollowHandler;