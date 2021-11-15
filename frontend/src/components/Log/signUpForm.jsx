import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {

    }

    return (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="userName">Nom d'utilisateur</label>
            <br/>
            <input 
                type="text" 
                name="userName" 
                id="userName" 
                onChange={(e) => setUserName(e.target.value)} value={userName}
            />
            <div className="pseudo error"></div>
            <br/>
            <label htmlFor="firstName">Prénom</label>
            <br/>
            <input 
                type="text" 
                name="firstName" 
                id="firstName" 
                onChange={(e) => setFirstName(e.target.value)} value={firstName}
            />
            <div className="firstName error"></div>
            <br/>
            <label htmlFor="lastName">Nom</label>
            <br/>
            <input 
                type="text" 
                name="lastName" 
                id="lastName" 
                onChange={(e) => setLastName(e.target.value)} value={lastName}
            />
            <div className="lastName error"></div>
            <br/>
            <label htmlFor="email">Email</label>
            <br/>
            <input 
                type="text" 
                name="email" 
                id="email" 
                onChange={(e) => setEmail(e.target.value)} value={email}
            />
            <div className="email error"></div>
            <br/>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <input 
                type="password" 
                name="password" 
                id="password" 
                onChange={(e) => setPassword(e.target.value)} value={password}
            />
            <div className="password error"></div>
            <br/>
            <label htmlFor="password-conf">Confirmer mot de passe</label>
            <br/>
            <input 
                type="password" 
                name="password" 
                id="password-conf" 
                onChange={(e) => setControlPassword(e.target.value)} value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br/>
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
            <div className="terms error"></div>
            <br/>
            <input type="submit" value="Valider inscription" />
        </form>
    );
};

export default SignUpForm;