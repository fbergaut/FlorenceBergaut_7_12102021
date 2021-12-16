import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Utils';

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
                    </div>
                )
            })}
        </div>
    );
};

export default CardComments;