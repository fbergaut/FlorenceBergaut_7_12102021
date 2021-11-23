import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        
        const userExistError = document.querySelector(".userExist.error");
        const firstNameError = document.querySelector(".firstName.error");
        const lastNameError = document.querySelector(".lastName.error");
        const userNameError = document.querySelector(".userName.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(".password-confirm.error");
        const termsError = document.querySelector(".terms.error");

        passwordConfirmError.innerHTML="";
        termsError.innerHTML="";

        if(password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
                passwordConfirmError.innerHTML="Les mots de passe ne correspondent pas";

            if(!terms.checked)
                termsError.innerHTML="Veuillez valider les conditions générales";
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/users/register`,
                data: {
                    firstname,
                    lastname,
                    username,
                    email,
                    password
                }
            })
            .then((res) => {
                console.log(res.data.errors);
                console.log(res.data);
                if (res.data.errors && res.data.errors.errorPassword) {
                    firstNameError.innerHTML = "";
                    lastNameError.innerHTML = "";
                    userNameError.innerHTML = "";
                    emailError.innerHTML = "";
                    passwordError.innerHTML = res.data.errors.errorPassword;
                } else if (res.data.errors && res.data.errors.errorMessage) {
                    userExistError.innerHTML = res.data.errors.errorMessage;
                    firstNameError.innerHTML = "";
                    lastNameError.innerHTML = "";
                    userNameError.innerHTML = "";
                    emailError.innerHTML = "";
                    passwordError.innerHTML = "";
                } else if (res.data.errors) {
                    firstNameError.innerHTML = res.data.errors.firstName;
                    lastNameError.innerHTML = res.data.errors.lastName;
                    userNameError.innerHTML = res.data.errors.userName;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = "";
                }
                else {
                    setFormSubmit(true);
                }
            })
        }
    }

    return (
        <>
        {formSubmit ? (
            <>
            <SignInForm />
            <span></span>
            <h4 className="success">Enregistrement réussi, veuillez-vous connecter !</h4>
            </>
        ) : ( 
        <form action="" onSubmit={handleRegister} id="sign-up-form">
            <div className="userExist error"></div>
            <br/>
            <label htmlFor="firstName">Prénom</label>
            <br/>
            <input 
                type="text" 
                name="firstName" 
                id="firstName" 
                onChange={(e) => setFirstName(e.target.value)} value={firstname}
            />
            <div className="firstName error"></div>
            <br/>
            <label htmlFor="lastName">Nom</label>
            <br/>
            <input 
                type="text" 
                name="lastName" 
                id="lastName" 
                onChange={(e) => setLastName(e.target.value)} value={lastname}
            />
            <div className="lastName error"></div>
            <br/>
            <label htmlFor="userName">Nom d'utilisateur</label>
            <br/>
            <input 
                type="text" 
                name="userName" 
                id="userName" 
                onChange={(e) => setUserName(e.target.value)} value={username}
            />
            <div className="userName error"></div>
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
        )}
        </>
    );
};

export default SignUpForm;