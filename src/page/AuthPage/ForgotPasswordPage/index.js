import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../../fire";

import { sendPasswordResetEmail } from "firebase/auth";
import "./index.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendResetPass = async () => {
    try {
      await sendPasswordResetEmail(auth, email, null);
      toast.success("Send link to email success!");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found")
        // console.log(error.code);
        toast.error("Email does not exist!");
      else if (error.code === "auth/invalid-email")
        toast.error("Invalid email!");
      else toast.error("Oop! Maybe the email is wrong!!!");
    }
    // sendPasswordResetEmail
  };

  return (
    <div className="forgotContainer">
      <ToastContainer />
      <img className="planetIcon" src="images/planet.png" alt="planetImage" />
      <div className="forgotForm">
        <img className="starIcon" src="images/Star2.png" alt="starImage" />
        <Link to="/">
          <div className="logo">SpaceShoot!</div>
        </Link>
        <div className="title">Forgot password?</div>
        <div className="prompt">
          Don't worry! Enter your email we will send the link to Reset password
          via email
        </div>
        <input
          className="loginContainer__form__emailInput"
          placeholder="Email address"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <button className="loginButton" onClick={sendResetPass}>
          Send
        </button>

        <div>
          Remember password?{" "}
          <Link style={{ color: "red", fontWeight: "700" }} to={"/login"}>
            Login!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
