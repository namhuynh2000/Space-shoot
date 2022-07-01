import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import JoinInput from "../../components/JoinInput/JoinInput";
import socket from "../../connections/socket";
import { setReduxPlayer } from "../../redux/reducers/playerReducer";

import "./index.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
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
  }, [dispatch, navigate]);
  console.log("Start");

  return (
    <div className="homeContainer">
      <ToastContainer />
      <img className="planetIcon" src="images/planet.png" alt="planetImage" />
      <img className="roverIcon" src="images/Rover.png" alt="roverImage" />
      <div className="groupButton" >
        <img className="cometIcon" src="images/Comet.png" alt="cometImage" />
        <div className="logo">SpaceShoot!</div>
        <JoinInput
          className="playerName"
          label={"Player name"}
          value={playerName}
          onChangeHandle={_handlePlayerNameInput}
        />
        <JoinInput
          label={"Room code"}
          value={room}
          onChangeHandle={_handleRoomInput}
        />
        <button className="submitButton" onClick={_handleSubmit}>
          Enter
        </button>

        <Link to={"/login"}>
          {" "}
          <button className="createButton">Host game</button>
        </Link>
        <img className="starIcon" src="images/Star2.png" alt="starImage" />
      </div>
    </div>
  );
}
