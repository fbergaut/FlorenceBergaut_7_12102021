import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts } from '../../actions/postActions';
import FollowHandler from '../Profil/FollowHandler';
import { isEmpty, timestampParser } from '../Utils';
import EditDeletComment from './EditDeleteComment';

const CardComments = ({ post }) => {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();

        if(text) {
            dispatch(addComment(post.uuid, userData.uuid, text, userData.username))
                .then(() => dispatch(getPosts()))
                .then(() => setText(''));
        }
    };

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
                            <EditDeletComment comment={comment} postUuid={post.uuid}/>
                        </div>
                    </div>
                );
            })}
            {userData.uuid && (
                <form action="" onSubmit={handleComment} className='comment-form'>
                    <input
                        type="text" 
                        name='text' 
                        onChange={(e) => setText(e.target.value)} 
                        value={text} placeholder='Laisser un commentaire'
                    />
                    <br />
                    <input type="submit" value="envoyer"/>
                </form>
            )}
        </div>
    );
};

export default CardComments;