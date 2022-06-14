import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import JoinInput from "../../components/JoinInput/JoinInput";
import socket from "../../connections/socket";
import { setReduxPlayer } from "../../redux/reducers/playerReducer";

import backgroundImg from "../../img/background.png"
import "./index.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  const [playerName, setPlayerName] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

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
  }, []);

  return (
    <div className="homeContainer" style={{ backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '110vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     }}>
      <ToastContainer />
      <div className="groupButton" style={{
        backgroundColor:'white',
        padding:'10px',
        borderRadius:'4px'
    }}>
      <JoinInput
        label={"Player name"}
        value={playerName}
        onChangeHandle={_handlePlayerNameInput}
      />
      <JoinInput
        label={"Room code"}
        value={room}
        onChangeHandle={_handleRoomInput}
      />
      <button className="submitButton" onClick={_handleSubmit}>Enter</button>
      {error && <p className="info">{error}</p>}

      <Link to={"/host"}> <button className="createButton" >Create Game</button>
    </Link>
        
      </div>

    </div>
  );
}
