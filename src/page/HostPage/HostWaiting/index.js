import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import PlayerList from "../../../components/PlayerList/PlayerList";
import socket from "../../../connections/socket";

export default function HostWaiting() {
  const [players, setPlayers] = useState([]);
  const [params] = useSearchParams();
  const [room, setRoom] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const quizId = params.get("quizId");
    socket.emit("hostGame", quizId);
  }, []);

  useEffect(() => {
    //Send request to get player list
    socket.emit("fetchPlayersInRoom");

    //Listen to receive player list
    socket.on("receive__players", (data) => {
      console.log(data);
      setPlayers(data);
    });

    // Listen to host game result
    socket.on("hostGameRes", (res) => {
      if (!res.result) {
        alert("Host failed");
        navigate("/host");
        return;
      }

      setRoom(res.game.room);
    });
  }, [socket]);

  const startBtn_click = (e) => {
    const quizId = params.get("quizId");
    socket.emit("startGame");
    navigate(`/host/question?quizId=${quizId}&question=1`);
  };

  return (
    <div>
      <PlayerList players={players} room={room} />
      <button
        onClick={startBtn_click}
        disabled={players.length > 0 ? false : true}
      >
        Start game
      </button>
    </div>
  );
}
