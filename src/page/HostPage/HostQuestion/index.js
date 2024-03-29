import "./index.scss";

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import socket from "../../../connections/socket";
import {
  generateImage,
  questionCountDownInit,
  questionLoading,
} from "../../../libs/library";
import AnswerChoices from "../../../components/AnswerChoices/AnswerChoices";
import AnswerChar from "../../../components/AnswerChart/AnswerChar";
import QuestionControlButton from "../../../components/QuestionControlButton/QuestionControlButton";
import { QuestionLoading } from "../../../components/QuestionLoading/QuestionLoading";
import User from "../../../components/User/User";
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
    async function handleGetQuestionRes(res) {
      if (res.result) {
        setQuestion(res.questionData);
        await wait(questionLoading);
        setIsLoading(false);
        let countDown = questionCountDownInit;
        setQuestionCountDown(countDown);
        interval = setInterval(() => {
          if (countDown === 0) {
            clearInterval(interval);
            interval = null;
            socket.emit("stopQuestion");
          }
          // if (countDown === 0) {

          // } else {
          else setQuestionCountDown(--countDown);
          // }
        }, 1000);
      } else {
        alert("Get question failed");
        navigate("/");
      }
    }

    socket.on("getQuestionRes", handleGetQuestionRes);

    // Listen to player answer response

    function handlePlayerAnswerRes(playerAnswerList) {
      setTotalAnswer(playerAnswerList);
    }

    socket.on("playerAnswerRes", handlePlayerAnswerRes);
    // socket.on("playerAnswerRes", (playerAnswerList) => {
    //   setTotalAnswer(playerAnswerList);
    // });

    // Listen to time out response
    function handleQuestionTimeOut() {
      setIsEnd(true);
    }

    socket.on("questionTimeOut", handleQuestionTimeOut);
    // socket.on("questionTimeOut", () => {
    //   console.log("Time out");
    //   setIsEnd(true);
    // });

    return () => {
      clearInterval(interval);
      socket.off("getQuestionRes", handleGetQuestionRes);
      socket.off("playerAnswerRes", handlePlayerAnswerRes);
      socket.off("questionTimeOut", handleQuestionTimeOut);
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
          {/* <div
            className="host-question__progress"
            style={{ animationDuration: `${questionLoading}s` }}
          ></div> */}
          <QuestionLoading duration={questionLoading} />
        </div>
      )}

      {!isLoading && question && (
        <div>
          <div className="logoSlave">SpaceShoot!</div>
          <User />
          <div className="host-question__detail">
            <div className="host-question__detail__info">
              <div className="host-question__detail__info__number">
                <div className="host-question__detail__info__number_text">
                  Question{" "}
                </div>
                <div className="host-question__detail__info__number_number">
                  {" "}
                  {question.questionIndex + 1}/{question.questionLength}
                </div>
              </div>
              <div className="host-question__detail__info__question-content">
                {question.questionData.content}
              </div>
            </div>

            {!isEnd && (
              <div className="host-question__detail-info">
                <div className="host-question__detail-info__2">
                  <div className="host-question__detail-info-countdown">
                    <span>{questionCountDown}</span>
                  </div>
                  <div className="host-question__detail-info-answer-count">
                    <div className="host-question__detail__info__number">
                      <div className="host-question__detail__info__number_text">
                        Answers{" "}
                      </div>
                      <div className="host-question__detail__info__number_number">
                        {" "}
                        {totalAnswer?.playerAnswers?.length ?? 0}
                      </div>
                    </div>
                    {/* <span>
                    <p>{totalAnswer?.playerAnswers?.length ?? 0}</p>
                    <p>Answers</p>
                  </span> */}
                  </div>
                </div>
                <div className="host-question__detail-info-image">
                  <img
                    src={generateImage(question.questionData.imgPath)}
                    alt=""
                  />
                </div>
                {!isEnd && (
                  <QuestionControlButton
                    clickHandle={_skipBtnClickHandle}
                    content={"skip"}
                  />
                )}
              </div>
            )}

            {isEnd && (
              <div className="host-question__result">
                <AnswerChar
                  choices={question.questionData.choices}
                  playerAnswers={totalAnswer.playerAnswers}
                  correctAnswer={question.questionData.correctAnswer}
                />
                {isEnd && (
                  <div className="host-question__result__buttonNext">
                    <QuestionControlButton
                      clickHandle={_nextBtnClickHandle}
                      content={"Next"}
                    />
                  </div>
                )}
              </div>
            )}

            <div>
              <AnswerChoices
                choices={question.questionData.choices}
                disabled={isEnd}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostQuestionPage;
