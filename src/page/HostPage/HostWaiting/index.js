import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import PlayerList from "../../../components/PlayerList/PlayerList";
import socket from "../../../connections/socket";
import "./index.scss"

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
    function handlePlayerList(data) {
      setPlayers(data);
    }
    socket.on("receive__players", handlePlayerList);
    // socket.on("receive__players", (data) => {
    //   console.log(data);
    //   setPlayers(data);
    // });

    // Listen to host game result

    function handleHostGameRes(res) {
      if (!res.result) {
        alert("Host failed");
        navigate("/host");
        return;
      }
      socket.room = res.game.room;
      setRoom(res.game.room);
    }
    socket.on("hostGameRes", handleHostGameRes);
    // socket.on("hostGameRes", (res) => {});
    return () => {
      socket.off("receive__players", handlePlayerList);
      socket.off("hostGameRes", handleHostGameRes);
    };
  }, [socket]);

  const startBtn_click = (e) => {
    const quizId = params.get("quizId");
    socket.emit("startGame");
    navigate(`/host/question?quizId=${quizId}&question=1`);
  };

  return (
    <div className="waitingRoomContainer" >
      <PlayerList players={players} room={room} />
      <button className="startGameButton"
        onClick={startBtn_click}
        disabled={players.length > 0 ? false : true}
      >
        Start game
      </button>
    </div>
  );
}
