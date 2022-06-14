import "./index.scss";

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import socket from "../../../connections/socket";
import {
  checkObjectEmpty,
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

  const [totalAnswer, setTotalAnswer] = useState({
    id: "",
    playerAnswers: [],
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (checkObjectEmpty(host)) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  useEffect(() => {
    let interval = null;

    setIsLoading(true);
    setIsEnd(false);

    // Waiting for loading question
    function wait(seconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    }

    socket.emit("getQuestion", questionLoading);

    // Listen to get question response
    socket.on("getQuestionRes", async (res) => {
      if (res.result) {
        setQuestion(res.questionData);
        await wait(questionLoading);
        setIsLoading(false);
        let countDown = questionCountDownInit;
        setQuestionCountDown(countDown);
        interval = setInterval(() => {
          if (countDown === 0) {
            socket.emit("stopQuestion");
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
      setTotalAnswer(playerAnswerList);
    });

    // Listen to time out response
    socket.on("questionTimeOut", () => {
      console.log("Time out");
      setIsEnd(true);
    });

    return () => {
      clearInterval(interval);
    };
  }, [params, navigate]);

  const _skipBtnClickHandle = () => {
    socket.emit("stopQuestion");
  };

  const _nextBtnClickHandle = () => {
    const quizId = params.get("quizId");
    const questionIndex = params.get("question");

    if (questionIndex >= question.questionLength) {
      socket.emit("nextQuestion");
      navigate(`/host/summary`);
      return;
    }
    navigate(`/host/scoreboard?quizId=${quizId}&&question=${questionIndex}`);
  };

  return (
    <div className="host-question">
      {!isEnd && isLoading && question && (
        <div>
          <p>Question {params.get("question")}</p>
          <h2>{question.content}</h2>
          <div
            className="host-question__progress"
            style={{ animationDuration: `${questionLoading}s` }}
          ></div>
        </div>
      )}

      {!isLoading && question && (
        <div className="host-question__detail">
          <div className="host-question__detail-top">
            <h2>{`${question.questionIndex + 1}/${
              question.questionLength
            }`}</h2>
            <h1>{question.content}</h1>
          </div>

          {!isEnd && (
            <QuestionControlButton
              clickHandle={_skipBtnClickHandle}
              content={"skip"}
            />
          )}

          {isEnd && (
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
