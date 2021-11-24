import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import { UidContext } from "./AppContext";
import LogOut from "./Log/LogOut";

const Navbar = () => {
    const uid = useContext(UidContext);

    return (
       <nav>
           <div className="nav-container">
               <div className="logo">
                   <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon-left-font.png" alt="logo groupomania" />
                            
                        </div>
                   </NavLink>
               </div>
               {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>Bienvenue 'valeur dynamique'</h5>
                            </NavLink>
                        </li>
                        <LogOut />
                    </ul> 
               ) : (
                   <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/profil">
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul> 
               )}
           </div>
       </nav>
    );
};

export default Navbar;