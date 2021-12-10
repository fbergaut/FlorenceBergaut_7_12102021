import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
                <h2>test</h2>
            )}
        </li>
    );
};

export default Card;