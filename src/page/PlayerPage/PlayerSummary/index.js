import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../../connections/socket";
import { selectPlayer } from "../../../redux/reducers/playerReducer";
import "./index.scss";

const PlayerSummaryPage = () => {
  const player = useSelector(selectPlayer);
  const [rank, setRank] = useState("");

  useEffect(() => {
    function handlePlayerRank(res) {
      const rank = res.rankList.findIndex(
        (playerInfo) => playerInfo.id === player.id
      );
      // setRank(rankIndex);
      if (rank !== -1) {
        setRank(rank + 1);
      }
    }

    socket.on("playerRank", handlePlayerRank);
    // socket.on("playerRank", (res) => {

    // });

    return () => {
      socket.off("playerRank", handlePlayerRank);
    };
  }, [player.id]);
  return (
    <div className="playerSummaryContainer">
      <div className="logoSlave">SpaceShoot!</div>

      <div className="summaryWrap">
        <div className="title">Rank</div>
        <div className="logoRocket">
          <img src="/images/Vectary texture.png" alt="logo-rocket" />
        </div>
        <div className="name">{player.name}</div>
        <div className="rank">
          RANK {rank}
          {rank === 1 && (
            <div className="logoStar">
              <img src="/images/Star2.png" alt="logo-Star" />
            </div>
          )}
        </div>
        <div className="score">{player.score} Point</div>
        {rank === 1 && (
          <div className="notifi">Congratulation you are winner</div>
        )}
      </div>
    </div>
  );
};

export default PlayerSummaryPage;
