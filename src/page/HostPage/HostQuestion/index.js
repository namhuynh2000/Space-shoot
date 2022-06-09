import "./index.scss";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import socket from "../../../connections/socket";
import { selectHost } from "../../../redux/reducers/hostReducer";
import { countPlayerAnswers, generateImage } from "../../../libs/library";
import AnswerChoices from "../../../components/AnswerChoices/AnswerChoices";
import AnswerChar from "../../../components/AnswerChart/AnswerChar";
const HostQuestionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const [questionCountDown, setQuestionCountDown] = useState(20);
  const [params] = useSearchParams();
  const { room } = useSelector(selectHost);

  const resultRef = useRef(null);
  const [totalAnswer, setTotalAnswer] = useState({
    id: "",
    playerAnswers: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!room) {
      navigate("/");
    }
  }, [room]);

  useEffect(() => {
    const questionIndex = params.get("question") ? params.get("question") : 1;
    let interval = null;

    setTimeout(() => {
      socket.emit("getQuestion", room, questionIndex);
    }, 4000);

    socket.on("getQuestionRes", (res) => {
      if (res.result) {
        setQuestion(res.questionData);
        setIsLoading(false);
        let countDown = 5;
        setQuestionCountDown(countDown);
        interval = setInterval(() => {
          if (countDown === 0) {
            socket.emit("stopQuestion", room, questionIndex);
            clearInterval(interval);
          } else {
            setQuestionCountDown(--countDown);
          }
        }, 1000);
      } else {
        alert("Start question failed");
        navigate("/");
      }
    });

    socket.on("playerAnswerRes", (playerAnswerList) => {
      console.log(playerAnswerList);
      setTotalAnswer(playerAnswerList);
    });

    socket.on("questionTimeOut", () => {
      console.log("Time out");
      setIsEnd(true);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

 
  return (
    <div className="host-question">
      {!isEnd && isLoading && (
        <div>
          <p>Question {question.id}</p>
          <div className="host-question__progress"></div>
        </div>
      )}

      {!isLoading && question && (
        <div className="host-question__detail">
          <h1>{question.content}</h1>

          {!isEnd && (
            <button className="host-question__control-btn">Skip</button>
          )}

          {isEnd && (
            <button className="host-question__control-btn">Next</button>
          )}

          {!isEnd && (
            <div className="host-question__detail-info">
              <span>{questionCountDown}</span>
              <img src={generateImage(question?.image)} alt="" />
              <span>
                <p>{totalAnswer?.playerAnswers?.length ?? 0}</p>
                <p>Answers</p>
              </span>
            </div>
          )}

          {isEnd && (
            <AnswerChar
              choices={question.choices}
              playerAnswers={totalAnswer.playerAnswers}
              correctAnswer={question.correctAnswer}
            />
          )}

          <AnswerChoices choices={question.choices} disabled={isEnd} />
        </div>
      )}
    </div>
  );
};

export default HostQuestionPage;
