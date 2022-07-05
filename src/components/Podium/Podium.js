import React from "react";
import "./Podium.scss";
import "animate.css"

const Podium = ({ rankList, topNumber }) => {
  // var audio = new Audio('/audios/ho_reo.mp3');
  // audio.play();
  return (
    <ul className="podium">
      {Array.from(Array(topNumber).keys()).map((rank) => (
        <li key={rank} className="podium__item">
          <img src={`/images/top${rank + 1}.png`} alt="" />
          {rankList[rank] && (
            <div className="podium__player-info">
              <h2>{rankList[rank].name}</h2>
              <h3>{rankList[rank].score}</h3>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Podium;
