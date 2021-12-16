import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";

const Card = ({ post })=> {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])

    return (
        <li className="card-container" key={post.uuid}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                <div className="card-left">
                    <img src={
                        !isEmpty(usersData[0]) && 
                        usersData.map((user) => {
                            if (user.uuid === post.posterUuid) {
                                return user.picture
                            } else return null
                            }).join('')
                        } 
                        alt="poster-pic" 
                        />
                </div>
                <div className="card-right">
                    <div className="card-header">
                        <div className="pseudo">
                            <h3>
                                {
                                !isEmpty(usersData[0]) && 
                                usersData.map((user) => {
                                    if (user.uuid === post.posterUuid){
                                        return user.username
                                    }
                                    return null
                                    })
                                }
                            </h3>
                            {post.posterUuid !== userData.uuid && (
                                <FollowHandler idToFollow={post.posterUuid} type={'card'}/>
                            )}
                        </div>
                        <span>{dateParser(post.createdAt)}</span>
                    </div>
                    <p>{post.message}</p>
                    {post.picture && (
                        <img src={post.picture} alt="card-pic" className="card-pic"/>
                    )}
                    {post.video && (
                        <iframe
                            width="500"
                            height="300"
                            src={post.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={post.uuid}
                        ></iframe>
                    )}
                    <div className="card-footer">
                        <div className="comment-icon">
                            <img src="./img/icons/message1.svg" alt="comment" />
                            <span>{post.comments.length}</span>
                        </div>
                        <LikeButton post={post}/>
                        <img src="./img/icons/share.svg" alt="share" />
                    </div>
                    
                </div>
                </>
            )}
        </li>
    );
};

export default Card;