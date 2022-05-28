import React, { useState, useEffect } from "react";
import socket from "../../connections/socket";

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [room, setRoom] = useState("");
  useEffect(() => {
    socket.on("receive__players", (data) => {
      console.log(data);
      setRoom(data[0].room);
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
