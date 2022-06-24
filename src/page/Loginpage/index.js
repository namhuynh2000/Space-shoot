import { Link} from "react-router-dom";
import "./index.scss"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {


  return (
    <div className="loginContainer" >
        <ToastContainer />
        <div className="loginContainer__background"></div>
        <div className="loginContainer__form" >
        <text className="loginContainer__form__text1">Login to your Account</text>
        <text className="loginContainer__form__text2">with your registered Email Address</text>
        <hr color="gray"></hr>
        <label >Email address</label>
        <input className="loginContainer__form__emailInput" placeholder="Enter email address"></input>
        <label>Enter Password</label>
        <input className="loginContainer__form__passwordInput" placeholder="Password"></input>
        <button className="loginButton" >Login</button>
        <p className="loginContainer__form__hr">Or</p>

        <button className="googleButton" >Login with Google</button>
        <div style={{textAlign:"right"}}>Not a member?    <Link style={{color:"red", fontWeight:"bolder"}} to={"/register"}>Register!</Link></div>

          
      </div>

    </div>
  );
}
