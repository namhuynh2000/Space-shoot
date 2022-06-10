import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../../connections/socket";
import { selectPlayer } from "../../../redux/reducers/playerReducer";

const PlayerSummaryPage = () => {
  const player = useSelector(selectPlayer);
  const [rank, setRank] = useState("");

  useEffect(() => {
    socket.on("playerRank", (rankList) => {
      const rank = rankList.findIndex(
        (playerInfo) => playerInfo.id === player.id
      );
      console.log(rank);
      if (rank !== -1) {
        setRank(rank + 1);
      }
    });
  }, []);
  return <div>{rank}</div>;
};

export default PlayerSummaryPage;
