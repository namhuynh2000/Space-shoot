import React from "react";

export default function PlayerList({ players, room }) {
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
