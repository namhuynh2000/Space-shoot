import React, { useEffect, useState } from "react";
import socket from "../../../connections/socket";
import Podium from "../../../components/Podium/Podium";

import QuestionControlButton from "../../../components/QuestionControlButton/QuestionControlButton";
import "./index.scss";
const HostSummaryPage = () => {
  const [finalRankList, setFinalRankList] = useState([]);
  const [gameName, setGameName] = useState("");

  useEffect(() => {
    socket.emit("getSummaryRankList", 4);

    function handleGetSummaryRankListRes(res) {
      console.log(res);
      setFinalRankList(res.rankList);
      setGameName(res.gameName);
    }
    socket.on("getSummaryRankListRes", handleGetSummaryRankListRes);
    // socket.on("getSummaryRankListRes", (res) => {});

    return () => {
      socket.off("getSummaryRankListRes", handleGetSummaryRankListRes);
    };
  }, []);

  const _exitBtnClickHandle = () => {
    delete socket.room;
    socket.disconnect();
  };

  return (
    gameName &&
    finalRankList && (
      <div className="summary">
        <div className="summary__container">
          <h1 className="summary__title">{gameName}</h1>
          <Podium rankList={finalRankList} topNumber={3} />
          <QuestionControlButton
            clickHandle={_exitBtnClickHandle}
            content={"Exit"}
          />
        </div>
      </div>
    )
  );
};

export default HostSummaryPage;
