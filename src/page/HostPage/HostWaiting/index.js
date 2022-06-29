import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import PlayerList from "../../../components/PlayerList/PlayerList";
import socket from "../../../connections/socket";
import "./index.scss";
import User from "../../../components/User/User"
import 'animate.css';

export default function HostWaiting() {
  const [players, setPlayers] = useState([]);
  const [params] = useSearchParams();
  const [game, setGame] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const quizId = params.get("quizId");
    socket.emit("hostGame", quizId);
  }, []);

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
      console.log(res);
      setGame(res.game);
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
      <div className="headerContainer">
        <div className="logoSlave">SpaceShoot!</div>
        <User />
      </div>


      <div className="bodyContainer">
        <ul className="playerWaitList">
          {players.map((player) => (
            <li className="grid-item" key={player.id}>{player.name}</li>
          ))}
        </ul>
        <div className="quizWrap">
          <div className="roomID">
            Room ID: {game !== "" ? game.room : ''}
          </div>
          <div className="nameQuiz">
            Name: {game !== "" ? game.data.name : ''}
          </div>
          <div className="avt-playerNumber">

            <img className="imgQuiz" src={game !== "" ? game.data.imgPath : ''} alt="imgQuiz" />

            <div className="numberPlayerWrap">
              Player
              <div className="numberPlayer">
                {players !== "" ? players.length : ''}
              </div>
            </div>
          </div>
          <div className={players.length > 0 ? "startBtn--active" : "startBtn"} onClick={startBtn_click}
          >Start Game
          </div>
        </div>
      </div>

      {/* <PlayerList players={players} room={room} /> */}
      {/* <button className="startGameButton"
        onClick={startBtn_click}
        disabled={players.length > 0 ? false : true}
      >
        Start game
      </button> */}
    </div>
  );
}
