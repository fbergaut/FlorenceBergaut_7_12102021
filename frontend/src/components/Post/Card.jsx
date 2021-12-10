import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

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
                            if (user.uuid === post.posterUuid)
                            return user.picture;
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
                                    if (user.uuid === post.posterUuid)
                                    return user.username;
                                    })
                                }
                            </h3>
                            
                        </div>
                    </div>
                </div>
                </>
            )}
        </li>
    );
};

export default Card;