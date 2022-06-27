import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../fire";
import { useNavigate } from "react-router-dom";
import { selectHost, setReduxHost } from "../../redux/reducers/hostReducer";
import { useDispatch, useSelector } from "react-redux";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import "./index.scss";

function ForgotPassword() {
    const navigate = useNavigate();
    const host = useSelector(selectHost);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRePassword, setReRegisterPassword] = useState("");


    const ClearInputs = () => {
        registerEmail = '';
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
        <div className='forgotContainer'>
            <img className="planetIcon" src="images/planet.png" alt="planetImage" />
            <div className="forgotForm">
                <img className="starIcon" src="images/Star2.png" alt="starImage" />

                <div className="logo">SpaceShoot!</div>
                <div className="title">Forgot password?</div>
                <div className="prompt">Don't worry! Enter your email we will send the link to Reset password via email</div>
                <input
                    className="loginContainer__form__emailInput"
                    placeholder="Email address"
                    onChange={(e) => {
                        setRegisterEmail(e.target.value);
                    }}
                ></input>
                

                <button className="loginButton">
                    Send
                </button>

                <div>
                    Already have an account?{" "}
                    <Link style={{ color: "red", fontWeight: "700" }} to={"/login"}>
                        Login!
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword