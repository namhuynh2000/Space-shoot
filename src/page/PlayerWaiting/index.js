import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import socket from "../../connections/socket";
import {
  selectUser,
  setReduxPlayerName,
  setReduxPlayerRoom,
  setReduxPlayerRole,
} from "../../redux/reducers/userReducer";

export default function PlayerWaitingPage() {
  const [searchParams] = useSearchParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.playerName) {
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
        dispatch(setReduxPlayerRole("Player"));
      } else {
        alert("Join failed");
        navigate("/");
      }
    });
  }, []);
  return <div>Waiting...</div>;
}
