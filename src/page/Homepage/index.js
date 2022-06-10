import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import JoinInput from "../../components/JoinInput/JoinInput";
import socket from "../../connections/socket";
import { setReduxPlayer } from "../../redux/reducers/playerReducer";

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
        setError(res.msg);
      }
    });
  }, []);

  return (
    <div>
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
      <button onClick={_handleSubmit}>Submit</button>
      {error && <p className="info">{error}</p>}

      <Link to={"/host"}>Host game</Link>
    </div>
  );
}
