import React, { useContext, useEffect, useState } from 'react';
import {UidContext} from "../AppContext";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/postActions';
import { isEmpty } from "../Utils";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post.uuid, uid))
        setLiked(true);
    };

    const unlike = () => {
        dispatch(unlikePost(post.uuid, uid))
        setLiked(false);
    };
    

    useEffect(() =>{
        //console.log(uid);
        if (!isEmpty(post.likers) || isEmpty(post.likers)) {
            const uuid = post.likers.map((id)=>{
                const idLikers = id.posterUuid;
                return idLikers;
            });
            if (uuid.includes(uid)) {
                setLiked(true)
            } else setLiked(false);
        }
    }, [uid, post, liked])

    return (
        <div className="like-container">
            {uid === null && (
                <Popup
                trigger={<img src="./img/icons/heart.svg" alt="like" />}
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
                >
                <div>Connectez-vous<br/> pour liker 😉</div>
                </Popup>
            )}
            {uid && liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt='like' />
            )}
            {uid && liked === true && (
                <img src="./img/icons/heart-filled.svg" onClick={unlike} alt='unlike' />
            )}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;