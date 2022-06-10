import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import PlayerList from "../../../components/PlayerList/PlayerList";
import socket from "../../../connections/socket";
import { setReduxHostGame } from "../../../redux/reducers/hostReducer";

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
      const newHost = {
        room: res.game.room,
        questionLength: res.game.data.questions.length,
        name: res.game.data.name,
      };

      dispatch(setReduxHostGame(newHost));
      setRoom(res.game.room);
    });
  }, [socket]);

  const startBtn_click = (e) => {
    const quizId = params.get("quizId");
    socket.emit("startGame", room);
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
