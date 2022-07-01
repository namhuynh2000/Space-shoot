import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import PlayerList from "../../../components/PlayerList/PlayerList";
import socket from "../../../connections/socket";
import "./index.scss";
import User from "../../../components/User/User"
import 'animate.css';
// import TagCloud from 'react-tag-cloud';

import randomColor from 'randomcolor';

export default function HostWaiting() {
  const [players, setPlayers] = useState([]);
  const [playersLeft, setPlayersLeft] = useState([]);
  const [playersRight, setPlayersRight] = useState([]);
  const [params] = useSearchParams();
  const [game, setGame] = useState("");

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
    setPlayersLeft(players.filter((player, index) => {
      return index % 2 === 0;
    }))
    setPlayersRight(players.filter((player, index) => {
      return index % 2 === 1;
    }))
  }, [players])

  return (
    <div className="waitingRoomContainer">
      <div className="headerContainer">
        <div className="logoSlave">SpaceShoot!</div>
        <User />
      </div>
      <div className="bodyContainer">
        <div className="bodyHeader">
          <div className="playerLeft">
            {/* {playersLeft && <TagCloud
              style={{
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                padding: 15,
                width: '100%',
                height: '100%',
                color: () => randomColor()
              }}>
              {
                playersLeft.map((player) => {
                  return <li className="animate__heartBeat" key={player.id}>{player.name}</li>
                })
              }


            </TagCloud>} */}
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
            <div className={players.length > 0 ? "startBtn--active" : "startBtn"} onClick={startBtn_click}
            >Start Game
            </div>
          </div>
          {/* {playersRight && <TagCloud
            style={{
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              padding: 15,
              width: '100%',
              height: '100%',
              color: () => randomColor()
            }}>
            {
              playersRight.map((player) => {
                return <li className="animate__heartBeat" key={player.id}>{player.name}</li>
              })
            }
          </TagCloud>} */}
        </div>
      </div>

    </div >
  );
}
