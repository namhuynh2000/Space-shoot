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


  const register = async () => {
    if (registerPassword === registerRePassword) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        toast.success("Đăng ký tài khoản thành công!");
        console.log(user);
      } catch (error) {
        console.log(error.message);
        toast.error("Đăng ký không thành công!");
      }
    } else {
      toast.error("Đăng ký không thành công");
    }
    ClearInputs();
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

        <div className="logo">SpaceShoot!</div>
        <div className="title">Signup to create Account</div>
        <input
          className="registerContainer__form__emailInput"
          placeholder="Email address"
          value={registerEmail}
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        ></input>
        <input
          className="registerContainer__form__passwordInput"
          placeholder="Password"
          type="password"
          value={registerPassword}
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        ></input>
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
