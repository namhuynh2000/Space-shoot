import { Link } from "react-router-dom";
import "./index.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../fire";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectHost, setReduxHost } from "../../redux/reducers/hostReducer";

export default function RegisterPage() {
  const navigate = useNavigate();
  const host = useSelector(selectHost);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRePassword, setRegisterRePassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");

  const eyeHandle = () => {
    if (typePassword === 'password')
      setTypePassword("text");
    else setTypePassword("password");
  }

  const register = async () => {
    if (registerPassword !== registerRePassword) {
      toast.error("Password incorrect!");
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      toast.success("Register success!");
      ClearInputs();
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/email-already-in-use')
        toast.error("Email already exist!");
      else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email!");
      }
      else if (error.code === 'auth/weak-password') {
        toast.error("Password too weak!");
        toast.warn("Password should be at least 6 characters!");
      }
      else {
        toast.error("Oop! Something wrong!!!");
      }
    }

  };

  const ClearInputs = () => {
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterRePassword("");
  }

  return (
    <div className="registerContainer">
      <ToastContainer />
      <img className="planetIcon" src="images/planet.png" alt="planetImage" />
      <div className="registerForm">
        <img className="starIcon" src="images/Star2.png" alt="starImage" />
        <Link to="/">
          <div className="logo">SpaceShoot!</div>

        </Link>
        <div className="title">Signup to create Account</div>
        <input
          className="registerContainer__form__emailInput"
          placeholder="Email address"
          value={registerEmail}
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        ></input>

        <div className="password__container">
          <input
            className="registerContainer__form__passwordInput"
            placeholder="Password"
            type={typePassword}
            value={registerPassword}
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          ></input>
          <img className="eyeIcon" src={typePassword === 'password' ? 'images/eye-close.png' : 'images/eye-open.png'} alt="eyeIcon" onClick={eyeHandle} />
        </div>
        <input
          className="registerContainer__form__passwordInput"
          placeholder="Confirm password"
          type="password"
          value={registerRePassword}
          onChange={(e) => {
            setRegisterRePassword(e.target.value);
          }}
        ></input>

        <button className="registerButton" onClick={register}>
          Signup
        </button>

        <div>
          Already have an account?{" "}
          <Link style={{ color: "red", fontWeight: "700" }} to={"/login"}>
            Login!
          </Link>
        </div>
      </div>
    </div>
  );
}
