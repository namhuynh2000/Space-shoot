import { Link } from "react-router-dom";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../fire";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectHost, setReduxHost } from "../../redux/reducers/hostReducer";
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const host = useSelector(selectHost);
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (host.id) navigate("/host");
  }, [host, navigate]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const host = {
          name: result.user.displayName,
          email: result.user.email,
          id: result.user.uid,
          photoURL: result.user.photoURL,
        };
        dispatch(setReduxHost(host));

        navigate("/host");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      navigate("/host");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="loginContainer">
      <ToastContainer />
      <div className="loginContainer__form">
        <p className="loginContainer__form__text1">Login to your Account</p>
        <p className="loginContainer__form__text2">
          with your registered Email Address
        </p>
        <hr color="gray"></hr>
        <label>Email address</label>
        <input
          className="loginContainer__form__emailInput"
          placeholder="Enter email address"
          onChange={(e) => {
            setloginEmail(e.target.value);
          }}
        ></input>
        <label htmlFor="">Forgot password?</label>
        <input
          className="loginContainer__form__passwordInput"
          placeholder="Password"
          onChange={(e) => {
            setloginPassword(e.target.value);
          }}
        ></input>
        <button className="loginButton" onClick={login}>
          Login
        </button>
        <p className="loginContainer__form__hr">Or</p>
        <button className="googleButton" onClick={signInWithGoogle}>
          Login with Google
        </button>
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
