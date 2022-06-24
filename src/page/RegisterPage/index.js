import "./index.scss"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {


  return (
    <div className="registerContainer" >
        <ToastContainer />
        <div className="registerContainer__background"></div>
        <div className="registerContainer__form" >
        <text className="registerContainer__form__text1">Create new Account</text>
        <text className="registerContainer__form__text2">with your Email Address</text>
        <hr color="gray"></hr>
        <label >Email address</label>
        <input className="registerContainer__form__emailInput" placeholder="Enter email address"></input>
        <label>Enter Password</label>
        <input className="registerContainer__form__passwordInput" placeholder="Password"></input>
        <label>Confirm Password</label>
        <input className="registerContainer__form__repasswordInput" placeholder="Password"></input>
        <button className="registerButton" >Confirm</button>

          
      </div>

    </div>
  );
}
