import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../../connections/socket";

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const { room } = useParams();
  useEffect(() => {
    socket.emit("fetchPlayersInRoom", room);

    socket.on("receive__players", (data) => {
      console.log(data);
      setPlayers(data);
    });
  }, [socket]);
  return (
    players && (
      <div>
        <p>Players in room {room}: </p>
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
    )
  );
}
