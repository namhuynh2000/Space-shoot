import React from "react";
import "./User.scss";
import { clearHost, selectHost } from "../../redux/reducers/hostReducer";
import { useDispatch, useSelector } from "react-redux";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../fire";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgProfile } from "react-icons/cg";
function User() {
  const host = useSelector(selectHost);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      navigate("/");
      await signOut(auth);
      dispatch(clearHost());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="user">
      <ToastContainer />
      <div className="user-avt">
        {host.photoURL && <img src={host.photoURL} alt="avatar" />}
        {!host.photoURL && <CgProfile className="avatar" />}
        <div className="logOut" onClick={logOut}>
          Logout <CgLogOut className="logOutIcon" />
        </div>
      </div>
      <div className="user-name">{host.name || "User"}</div>
    </div>
  );
}

export default User;
