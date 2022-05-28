import React, { useState, useEffect } from "react";
import JoinInput from "../../components/JoinInput/JoinInput";
import socket from "../../connections/socket";
import { useNavigate } from "react-router-dom";
export default function JoinGamePage() {
  const [playerName, setPlayerName] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
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
      console.log(res);
      if (res.result) {
        navigate("/host");
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
    </div>
  );
}
