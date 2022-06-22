import React from "react";
import "./PlayerList.scss"

export default function PlayerList({ players, room }) {
  return (
    players && (
      <div className="playerListContainer">
        <div className="topContainer">
          <p className="playerNumber">Player: {players.length}</p>
          <p className="roomID">ROOM ID: {room} </p>
          <p className="proFile">Icon</p>
        </div>
        <ul className="playerWaitList">
          {players.map((player) => (
            <li className="playerInRoom" key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
    )
  );
}
