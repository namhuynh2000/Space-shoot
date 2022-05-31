import React, { useEffect, useState } from "react";
import PlayerList from "../../components/PlayerList/PlayerList";
import { useNavigate, useSearchParams } from "react-router-dom";
import socket from "../../connections/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setReduxPlayerRoom,
  setReduxPlayerRole,
} from "../../redux/reducers/userReducer";
export default function HostWaiting() {
  const [players, setPlayers] = useState([]);
  const [params] = useSearchParams();
  const [room, setRoom] = useState("");
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user.role) {
      const quizId = params.get("quizId");
      console.log(quizId);
      socket.emit("hostGame", quizId);
      return;
    }
    setRoom(user.room);
  }, []);

  useEffect(() => {
    socket.emit("fetchPlayersInRoom", room);

    socket.on("receive__players", (data) => {
      console.log(data);
      setPlayers(data);
    });

    socket.on("hostGameRes", (res) => {
      if (!res.result) {
        alert("Host failed");
        navigate("/host");
        return;
      }
      setRoom(res.game.roomId);
      dispatch(setReduxPlayerRole("Host"));
      dispatch(setReduxPlayerRoom(res.game.roomId));
    });
  }, [socket]);

  return <PlayerList players={players} room={room} />;
}
