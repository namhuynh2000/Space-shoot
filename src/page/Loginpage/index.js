import { Link} from "react-router-dom";

import JoinInput from "../../components/JoinInput/JoinInput";


import "./index.scss"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {


  return (
    <div className="homeContainer" >
      <ToastContainer />
      <div className="groupButton" >
      <JoinInput
        label={"Email"}
      />
      <JoinInput
        label={"Password"}
      />
      <button className="loginButton" >Login</button>

      <button className="googleButton" >Login by Google Account</button>
    <div>Not a member?    <Link to={"/host"}>Register!</Link></div>

        
      </div>

    </div>
  );
}
