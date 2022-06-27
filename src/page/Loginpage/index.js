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
      const result = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const host = {
        name: result.user.displayName,
        email: result.user.email,
        id: result.user.uid,
        photoURL: result.user.photoURL,
      };
      dispatch(setReduxHost(host));
      // console.log(user);
      navigate("/host");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="loginContainer">
      <ToastContainer />
      <img className="planetIcon" src="images/planet.png" alt="planetImage" />
      <div className="loginContainer__form">
        <img className="starIcon" src="images/Star2.png" alt="starImage" />
        <div className="logo">SpaceShoot!</div>
        <div className="loginContentWrap">
          <img className="telescopeIcon" src="images/Telescope.png" alt="telescopeImage" />
          <div className="loginContent">
            <p className="loginContainer__form__text">
              Login to your Account
            </p>
            <input
              className="loginContainer__form__emailInput"
              placeholder="Email address"
              onChange={(e) => {
                setloginEmail(e.target.value);
              }}
            ></input>
            <input
              className="loginContainer__form__passwordInput"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setloginPassword(e.target.value);
              }}
            ></input>
            <Link to={"/forgot"}>
            <div className="forgot">Forgot password?</div>
            </Link>
            <button className="loginButton" onClick={login}>
              Login
            </button>
            <p className="loginContainer__form__hr">Or</p>
            <img className="googleButton" onClick={signInWithGoogle} src="images/icons8-google-500 1.png" alt="" />
            <div style={{ textAlign: "right", marginRight: "25px" }}>
              Not a member?{"   "}
              <Link style={{ color: "red", fontWeight: "700" }} to={"/register"}>
                Register!
              </Link>
            </div>
          </div>
        </div>


      </div>
    </div>


  );
}
