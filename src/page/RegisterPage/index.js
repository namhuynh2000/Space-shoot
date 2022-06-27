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
  const [registerRePassword, setReRegisterPassword] = useState("");


  const ClearInputs = ()=>{
    registerEmail='';
    setReRegisterPassword("");
    setRegisterPassword("");

  

  }

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

  return (
    <div className="registerContainer">
      <ToastContainer />
      <div className="registerContainer__background"></div>
      <div className="registerContainer__form">
        <p className="registerContainer__form__text1">Create new Account</p>
        <p className="registerContainer__form__text2">
          with your Email Address
        </p>
        <hr color="gray"></hr>
        <label>Email address</label>
        <input
          className="registerContainer__form__emailInput"
          placeholder="Enter email address"
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        ></input>
        <label>Enter Password</label>
        <input
          className="registerContainer__form__passwordInput"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        ></input>
        <label>Confirm Password</label>
        <input
          className="registerContainer__form__repasswordInput"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setReRegisterPassword(e.target.value);
          }}
        ></input>
        <button className="registerButton" onClick={register}>
          Confirm
        </button>
      </div>
    </div>
  );
}
