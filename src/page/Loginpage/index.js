import { Link } from "react-router-dom";
import "./index.scss";
import { toast, ToastContainer } from "react-toastify";
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
  const [typePassword, setTypePassword] = useState("password");

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  useEffect(() => {
    if (host.id) navigate("/host");
  }, [host, navigate]);

  const eyeHandle = () => {
    if (typePassword === 'password')
      setTypePassword("text");
    else setTypePassword("password");
  }

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
        toast.error("Oop! Something wrong!!!");
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
      if (error.code === 'auth/wrong-password') {
        toast.error("Password incorrect!");
      }
      else if (error.code === 'auth/user-not-found')
        toast.error("Email does not exist!");
      else if (error.code === 'auth/too-many-requests')
        toast.error("Temporarily disabled due to many failed login attempts!");
      else
        toast.error("Oop! Something wrong!!!")
      console.log(error.message);
    }
  };

  return (
    <div className="loginContainer">
      <ToastContainer />
      <img className="planetIcon" src="images/planet.png" alt="planetImage" />
      <div className="loginContainer__form">
        <img className="starIcon" src="images/Star2.png" alt="starImage" />
        <Link to='/'>
          <div className="logo">SpaceShoot!</div>
        </Link>
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
            <div className="password__container">
              <input
                className="loginContainer__form__passwordInput"
                placeholder="Password"
                type={typePassword}
                onChange={(e) => {
                  setloginPassword(e.target.value);
                }}
              >
              </input>
              <img className="eyeIcon" src={typePassword === 'password' ? 'images/eye-close.png' : 'images/eye-open.png'} alt="eyeIcon" onClick={eyeHandle} />
            </div>
            <Link to={"/forgot"}>
              <div className="forgot">Forgot password?</div>
            </Link>
            <button className="loginButton" onClick={login}>
              Login
            </button>
            <p className="loginContainer__form__hr">Or</p>
            <img className="googleButton" onClick={signInWithGoogle} src="images/icons8-google-500 1.png" alt="" />
            <div>
              Not a member?{" "}
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
