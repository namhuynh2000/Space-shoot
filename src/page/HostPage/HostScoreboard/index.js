import React, { useEffect, useState } from "react";
import "./index.scss";
import Scoreboard from "../../../components/Scoreboard/Scoreboard";
import socket from "../../../connections/socket";
import { useNavigate, useSearchParams } from "react-router-dom";
import QuestionControlButton from "../../../components/QuestionControlButton/QuestionControlButton";

const HostScoreboardPage = () => {
  const [rankList, setRankList] = useState([]);
  const [params] = useSearchParams();

  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("getRankList");

    function handleGetRankListRes(res) {
      if (res.result) {
        console.log(res);
        setRankList(res.rankList);
        return;
      }
      navigate("/");
    }
    socket.on("getRankListRes", handleGetRankListRes);
    // socket.on("getRankListRes", (res) => {

    // });

    function handleNextQuestionRes(res) {
      if (res.result) {
        const quizId = params.get("quizId");
        const nextQuestionIndex = +params.get("question") + 1;
        navigate(
          `/host/question?quizId=${quizId}&question=${nextQuestionIndex}`
        );
      } else {
        navigate("/host/summary");
      }
    }
    socket.on("nextQuestionRes", handleNextQuestionRes);
    // socket.on("nextQuestionRes", (res) => {});

    return () => {
      socket.off("getRankListRes", handleGetRankListRes);
      socket.off("nextQuestionRes", handleNextQuestionRes);
    };
  }, [navigate, params]);

  const _nextBtnClickHandle = () => {
    socket.emit("nextQuestion");
  };

  return (
    <div className="scoreboard">
      <div className="scoreboard__container">
        <h1>Ranking</h1>
        <Scoreboard rankList={rankList} />
        <QuestionControlButton
          clickHandle={_nextBtnClickHandle}
          content={"next"}
        />
      </div>
    </div>
  );
};

export default HostScoreboardPage;
