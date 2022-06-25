import { Link } from "react-router-dom";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fire from "../../fire";
import { useState } from "react";

export default function LoginPage() {
  const { user, setUser } = useState("");
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { emailError, setEmailError } = useState("");
  const { passwordError, setPasswordError } = useState("");
  const { hasAccount, setHasAccount } = useState("false");

  const handleLogin = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => console.log(res))
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
    
  };
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      else{
        setUser(user);
      }
    });
  };

  return (
    <div className="loginContainer">
      <ToastContainer />
      <div className="loginContainer__background"></div>
      <div className="loginContainer__form">
        <text className="loginContainer__form__text1">
          Login to your Account
        </text>
        <text className="loginContainer__form__text2">
          with your registered Email Address
        </text>
        <hr color="gray"></hr>
        <label>Email address</label>
        <input
          className="loginContainer__form__emailInput"
          placeholder="Enter email address"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        ></input>
        <label>Enter Password</label>
        <input
          className="loginContainer__form__passwordInput"
          placeholder="Password"
        ></input>
        <button className="loginButton">Login</button>
        <p className="loginContainer__form__hr">Or</p>
        <button className="googleButton">Login with Google</button>
        <div style={{ textAlign: "right" }}>
          Not a member?{" "}
          <Link style={{ color: "red", fontWeight: "bolder" }} to={"/host"}>
            Register!
          </Link>
        </div>
      </div>
    </div>
  );
}
