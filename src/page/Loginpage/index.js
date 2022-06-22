import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import JoinInput from "../../components/JoinInput/JoinInput";
import socket from "../../connections/socket";
import { setReduxPlayer } from "../../redux/reducers/playerReducer";

import "./index.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [playerName, setPlayerName] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const _handlePlayerNameInput = (e) => {
    setPlayerName(e.target.value);
  };

  const _handleSubmit = () => {
    socket.emit("joinRoom", { room, name: playerName });
  };

  const _handleRoomInput = (e) => {
    setRoom(e.target.value);
  };

  useEffect(() => {
    socket.on("joinRoomRes", (res) => {
      if (res.result) {
        dispatch(setReduxPlayer(res.player));
        navigate(
          `/waiting?room=${res.player.room}&playerName=${res.player.name}`
        );
      } else {
        toast.error("Oop! Maybe the code is wrong!!!");

      }
    });
  }, [dispatch,navigate]);

  return (
    <div className="homeContainer" >
      <ToastContainer />
      <div className="groupButton" >
      <JoinInput
        label={"Email"}
        value={playerName}
        onChangeHandle={_handlePlayerNameInput}
      />
      <JoinInput
        label={"Password"}
        value={room}
        onChangeHandle={_handleRoomInput}
      />
      <button className="loginButton" >Login</button>

      <button className="googleButton" >Login by Google Account</button>
    <div>Not a member?    <Link to={"/host"}>Register!</Link></div>

        
      </div>

    </div>
  );
}
