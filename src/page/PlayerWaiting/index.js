import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import socket from "../../connections/socket";
import {
  selectPlayer,
  setReduxPlayerName,
  setReduxPlayerRoom,
} from "../../redux/reducers/playerReducer";
import { checkPlayerExist } from "../../libs/library";

export default function PlayerWaitingPage() {
  const [searchParams] = useSearchParams();
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //Handle user join by link
    if (!checkPlayerExist(player)) {
      const room = searchParams.get("room");
      const playerName = searchParams.get("playerName");
      if (room && playerName) {
        socket.emit("joinRoom", { room, name: playerName });
      }
    }
  }, []);

  useEffect(() => {
    socket.on("joinRoomRes", (res) => {
      if (res.result) {
        dispatch(setReduxPlayerName(res.player.name));
        dispatch(setReduxPlayerRoom(res.player.room));
      } else {
        alert("Join failed");
        navigate("/");
      }
    });

    //  Listen for event game start result
    socket.on("hostStartingGame", () => {
      navigate("/start");
    });
  }, []);
  return <div>Waiting...</div>;
}
