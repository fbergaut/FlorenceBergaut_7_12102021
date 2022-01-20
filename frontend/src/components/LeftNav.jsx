import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
    return (
        <li className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/' exact activeClassName="active-left-nav" aria-current="true">
                        <i className="fas fa-home"></i>
                        {/* <img src="./img/icons/home.svg" alt="home" /> */}
                    </NavLink>
                    <br/>
                    <NavLink to='/profil' exact activeClassName="active-left-nav" aria-current="true">
                        <i className="fas fa-user-circle"></i>
                        {/* <img src="./img/icons/user.svg" alt="user" /> */}
                    </NavLink>
                </div>
            </div>
        </li>
    )

};

export default LeftNav;