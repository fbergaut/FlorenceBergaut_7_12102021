import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/users/login`,
      withCredentials: true,
      data: {
        email,
        password,
      }
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.errors && res.data.errors.errorEmail) {
          emailError.innerHTML = res.data.errors.errorEmail;
          passwordError.innerHTML = "";
        } else if (res.data.errors && res.data.errors.errorPassword) {
          emailError.innerHTML = "";
          passwordError.innerHTML = res.data.errors.errorPassword;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const validation = () => {
  //   const form = document.getElementById("sign-up-form");
  //   const email = document.getElementById("email");
  //   const emailText = document.querySelector(".email.error");
  //   const pattern = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");

  //   if (pattern.test(email.value)) {
  //     form.classList.add("valid");
  //     form.classList.remove("invalid");
  //     emailText.innerHTML = "Votre email est correct";
  //     emailText.style.color = "#00ff00";
  //     return true;
  //   } else {
  //     form.classList.remove("valid");
  //     form.classList.add("invalid");
  //     emailText.innerHTML = "Veuillez écrire une adresse email correcte";
  //     emailText.style.color = "#ff0000";
  //     return false;
  //   }
  // }

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        // onKeyDown={() => validation()}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;