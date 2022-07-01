import React from "react";
import "./Scoreboard.scss";
const Scoreboard = ({ rankList }) => {
  const top5List = rankList.slice(0,5);
  return (
    <ul className="scoreboard__list">
      {top5List.map((player, index) => (
        <li key={index} className="scoreboard__item">
          <p>{player.name}</p>
          <p>{player.score}</p>
        </li>
      ))}
    </ul>
  );
};

export default Scoreboard;
