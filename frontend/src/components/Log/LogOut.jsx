import React from "react";
import axios from 'axios';
import cookie from 'js-cookie';


const LogOut = () => {

    const removeCookie = (key) => {
        if(window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    };

    const logout = async () => {
        await axios({
            method:'GET',
            url: `${process.env.REACT_APP_API_URL}/users/logout`,
            withCredentials: true
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))

        window.location = "/";
    };

    return (
        <li onClick={logout} aria-current="true">
           <i className="fas fa-sign-out-alt"></i>
            {/* <img className="logout" src="./img/icons/logout.svg" alt="logout" /> */}
        </li>
    );
};

export default LogOut;