import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import PlayerList from "../../../components/PlayerList/PlayerList";
import socket from "../../../connections/socket";
import "./index.scss";
import User from "../../../components/User/User"
import 'animate.css';
import { TagCloud } from 'react-tagcloud'
import randomColor from 'randomcolor';

export default function HostWaiting() {
  const [players, setPlayers] = useState([]);
  const [playersLeft, setPlayersLeft] = useState([]);
  const [playersRight, setPlayersRight] = useState([]);
  const [params] = useSearchParams();
  const [game, setGame] = useState("");


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

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
      console.log("handlePlayerList run");

    }
    socket.on("receive__players", handlePlayerList);

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
  }, []);

  const startBtn_click = (e) => {
    const quizId = params.get("quizId");
    socket.emit("startGame");
    navigate(`/host/question?quizId=${quizId}&question=1`);
  };

  useEffect(() => {
    var listLeft = [];
    var listRight = [];
    players.forEach((player, index) => {
      if (index % 2 === 0) {
        listLeft.push({ value: player.name });
      }
      else {
        listRight.push({ value: player.name });
      }
    })
    setPlayersLeft(listLeft);
    setPlayersRight(listRight);
    // setPlayersLeft(players.map((player, index) => {
    //   if (index % 2 === 0)
    //     return { value: player.name };
    //   return {}
    // }));
    // setPlayersRight(players.map((player, index) => {
    //   if (index % 2 === 1)
    //     return { value: player.name };
    //   return {}
    // }))
  }, [players]);

  const customRenderer = (tag, size, color) => {
    return (
      <li className="animate__heartBeat" style={{ color }} key={tag.value}>
        {tag.value}
      </li>
    )
  }



  return (
    <div className="waitingRoomContainer">
      <div className="headerContainer">
        <div className="logoSlave">SpaceShoot!</div>
        <User />
      </div>
      <div className="bodyContainer">
        <div className="playerLeft">
          <TagCloud
            className="tagCloud"
            disableRandomColor={true}
            renderer={customRenderer}
            tags={playersLeft}
          />
        </div>
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
          <div className={players.length > 0 ? "startBtn--active" : "startBtn"} onClick={players.length > 0 ? startBtn_click : ''}
          >Start Game
          </div>
        </div>
        <div className="playerRight">
          <TagCloud
            className="tagCloud"
            disableRandomColor={true}
            renderer={customRenderer}
            tags={playersRight}
          />
        </div>

      </div>

    </div >
  );
}
