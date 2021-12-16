import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FollowHandler from '../Profil/FollowHandler';
import { isEmpty, timestampParser } from '../Utils';

const CardComments = ({ post }) => {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = () => {}

    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    <div className={comment.commenterUuid === userData.uuid ? "comment-container client" : "comment-container"} key={comment.uuid}>
                        <div className="left-part">
                            <img src={!isEmpty(usersData[0]) && 
                                    usersData.map((user) => {
                                        if (user.uuid === comment.commenterUuid) {
                                            return user.picture
                                        } else return null
                                        }).join('')
                                    } 
                            alt="commenter-pic" />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterUsername}</h3>
                                    {comment.commenterUuid !== userData.uuid && (
                                        <FollowHandler 
                                            idToFollow={comment.commenterUuid} 
                                            type={'card'}
                                        />
                                    )}
                                </div>
                                <span>{timestampParser(comment.createdAt)}</span>
                            </div>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default CardComments;