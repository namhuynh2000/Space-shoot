import React from "react";
import "./Scoreboard.scss";
const Scoreboard = ({ rankList }) => {
  return (
    <ul className="scoreboard__list">
      {rankList.map((player, index) => (
        <li key={index} className="scoreboard__item">
          <p>{player.name}</p>
          <p>{player.score}</p>
        </li>
      ))}
    </ul>
  );
};

export default Scoreboard;
