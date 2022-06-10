import React, { useEffect, useState } from "react";
import socket from "../../../connections/socket";
import Podium from "../../../components/Podium/Podium";
import { useSelector } from "react-redux";
import { selectHost } from "../../../redux/reducers/hostReducer";
import QuestionControlButton from "../../../components/QuestionControlButton/QuestionControlButton";
import "./index.scss";
import { useNavigate } from "react-router-dom";
const HostSummaryPage = () => {
  const [finalRankList, setFinalRankList] = useState([]);
  const navigate = useNavigate();
  const host = useSelector(selectHost);

  useEffect(() => {
    socket.emit("getSummaryRankList", host.room, 4);

    socket.on("getSummaryRankListRes", (rankList) => {
      console.log(rankList);
      setFinalRankList(rankList.slice(0, 3));
    });
  }, []);

  const _exitBtnClickHandle = () => {
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="summary">
      <div className="summary__container">
        <h1 className="summary__title">{host.name}</h1>
        <Podium rankList={finalRankList} topNumber={3} />
        <QuestionControlButton
          clickHandle={_exitBtnClickHandle}
          content={"Exit"}
        />
      </div>
    </div>
  );
};

export default HostSummaryPage;
