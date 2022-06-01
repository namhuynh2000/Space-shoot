import React, { useEffect, useState } from "react";
import PlayerList from "../../components/PlayerList/PlayerList";
import { useNavigate, useSearchParams } from "react-router-dom";
import socket from "../../connections/socket";
import { useDispatch } from "react-redux";
import {
  setReduxHostGame,
  setReduxHostRoom,
} from "../../redux/reducers/hostReducer";

export default function HostWaiting() {
  const [players, setPlayers] = useState([]);
  const [params] = useSearchParams();
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const quizId = params.get("quizId");
    socket.emit("hostGame", quizId);
  }, []);

  useEffect(() => {
    //Send request to get player list
    socket.emit("fetchPlayersInRoom", room);

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
      dispatch(setReduxHostRoom(res.game.roomId));
      dispatch(setReduxHostGame(res.game.name));
      setRoom(res.game.roomId);
    });
  }, [socket]);

  const startBtn_click = (e) => {
    const quizId = params.get("quizId");

    navigate(`/host/start?quizId=${quizId}`);
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
