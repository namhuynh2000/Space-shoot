import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import socket from "../../../connections/socket";
import { checkObjectEmpty } from "../../../libs/library";
import {
  selectPlayer,
  setReduxPlayerName,
  setReduxPlayerRoom,
} from "../../../redux/reducers/playerReducer";

export default function PlayerWaitingPage() {
  const [searchParams] = useSearchParams();
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //Handle user join by link
    console.log(player);
    if (checkObjectEmpty(player)) {
      const room = searchParams.get("room");
      const playerName = searchParams.get("playerName");
      if (room && playerName) {
        socket.emit("joinRoom", { room, name: playerName });
      }
    }
  }, []);

  useEffect(() => {
    function handleJoinRoomRes(res) {
      if (res.result) {
        dispatch(setReduxPlayerName(res.player.name));
        dispatch(setReduxPlayerRoom(res.player.room));
      } else {
        alert("Join failed");
        navigate("/");
      }
    }
    socket.on("joinRoomRes", handleJoinRoomRes);
    // socket.on("joinRoomRes", (res) => {});

    //  Listen for event game start result
    function handleHostStartGameRes(res) {
      navigate("/question");
    }

    socket.on("hostStartingGame", handleHostStartGameRes);
    // socket.on("hostStartingGame", () => {});

    return () => {
      socket.off("joinRoomRes", handleJoinRoomRes);
      socket.off("hostStartingGame", handleHostStartGameRes);
    };
  }, []);
  return <div>Waiting...</div>;
}
