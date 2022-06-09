import "./index.scss";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import socket from "../../../connections/socket";
import { selectHost } from "../../../redux/reducers/hostReducer";
import {
  generateImage,
  questionCountDownInit,
  questionLoading,
} from "../../../libs/library";
import AnswerChoices from "../../../components/AnswerChoices/AnswerChoices";
import AnswerChar from "../../../components/AnswerChart/AnswerChar";
import QuestionControlButton from "../../../components/QuestionControlButton/QuestionControlButton";
const HostQuestionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const [questionCountDown, setQuestionCountDown] = useState(
    questionCountDownInit
  );
  const [params] = useSearchParams();
  const { room } = useSelector(selectHost);

  const [totalAnswer, setTotalAnswer] = useState({
    id: "",
    playerAnswers: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!room) {
      navigate("/");
    }
  }, [room, navigate]);

  useEffect(() => {
    let interval = null;

    setIsLoading(true);
    setIsEnd(false);

    // Waiting for loading question
    setTimeout(() => {
      socket.emit("getQuestion", room);
    }, questionLoading * 1000);

    // Listen to get question response
    socket.on("getQuestionRes", (res) => {
      if (res.result) {
        console.log(res.questionData);
        setQuestion(res.questionData);
        setIsLoading(false);
        let countDown = questionCountDownInit;
        setQuestionCountDown(countDown);
        interval = setInterval(() => {
          if (countDown === 0) {
            socket.emit("stopQuestion", room);
            clearInterval(interval);
          } else {
            setQuestionCountDown(--countDown);
          }
        }, 1000);
      } else {
        alert("Get question failed");
        navigate("/");
      }
    });

    // Listen to player answer response
    socket.on("playerAnswerRes", (playerAnswerList) => {
      console.log(playerAnswerList);
      setTotalAnswer(playerAnswerList);
    });

    // Listen to time out reponse
    socket.on("questionTimeOut", () => {
      console.log("Time out");
      setIsEnd(true);
    });

    return () => {
      clearInterval(interval);
    };
  }, [params, navigate, room]);

  const _skipBtnClickHandle = () => {
    socket.emit("stopQuestion", room);
  };

  const _nextBtnClickHandle = () => {
    // socket.emit("nextQuestion", room);
    const quizId = params.get("quizId");
    const question = params.get("question");
    navigate(`/host/scoreboard?quizId=${quizId}&&question=${question}`);
  };

  return (
    <div className="host-question">
      {!isEnd && isLoading && params && (
        <div>
          <p>Question {params.get("question")}</p>
          <div
            className="host-question__progress"
            style={{ animationDuration: `${questionLoading}s` }}
          ></div>
        </div>
      )}

      {!isLoading && question && (
        <div className="host-question__detail">
          <h1>{question.content}</h1>

          {!isEnd && (
            // <button
            //   className="host-question__control-btn"
            //   onClick={_skipBtnClickHandle}
            // >
            //   Skip
            // </button>

            <QuestionControlButton
              clickHandle={_skipBtnClickHandle}
              content={"skip"}
            />
          )}

          {isEnd && (
            // <button
            //   className="host-question__control-btn"
            //   onClick={_nextBtnClickHandle}
            // >
            //   Next
            // </button>

            <QuestionControlButton
              clickHandle={_nextBtnClickHandle}
              content={"Next"}
            />
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
