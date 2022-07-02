import "./index.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnswerChoices from "../../../components/AnswerChoices/AnswerChoices";
import socket from "../../../connections/socket";
import {
  selectPlayer,
  setReduxPlayer,
} from "../../../redux/reducers/playerReducer";
import RingLoader from "react-spinners/RingLoader";
import PlayerQuestionResult from "../../../components/PlayerQuestionResult/PlayerQuestionResult";

const PlayerQuestionPage = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswer, setIsAnswer] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const navigate = useNavigate();
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();
  const [playerChoice, setPlayerChoice] = useState("");

  useEffect(() => {
    function handleGetQuestionRes(res) {
      if (res.result) {
        setQuestion(res.questionData);
        setIsLoading(false);
      } else {
        alert("Get question failed");
        navigate("/");
      }
    }
    socket.on("hostGetQuestionRes", handleGetQuestionRes);
    // socket.on("hostGetQuestionRes", (res) => {

    // });

    function handleUpdatePlayerRes(playerInfo) {
      dispatch(setReduxPlayer(playerInfo));
    }

    socket.on("updatePlayerInfo", handleUpdatePlayerRes);
    // socket.on("updatePlayerInfo", (playerInfo) => {
    //   dispatch(setReduxPlayer(playerInfo));
    // });

    function handleQuestionTimeOut() {
      setTimeOut(true);
    }

    socket.on("questionTimeOut", handleQuestionTimeOut);
    // socket.on("questionTimeOut", () => {
    //   setTimeOut(true);
    // });

    function handleNextQuestionRes(res) {
      if (res.result) {
        setIsLoading(true);
        setTimeOut(false);
        setIsAnswer(false);
        setCurrentQuestion((old) => old + 1);
      } else {
        navigate("/summary");
      }
    }

    socket.on("nextQuestionRes", handleNextQuestionRes);



    return () => {
      socket.off("getQuestionRes", handleGetQuestionRes);
      socket.off("updatePlayerInfo", handleUpdatePlayerRes);
      socket.off("questionTimeOut", handleQuestionTimeOut);
      socket.off("nextQuestionRes", handleNextQuestionRes);
    };
  }, [currentQuestion]);

  const _handlePlayerAnswer = (choice,index) => {
    socket.emit(
      "playerAnswer",
      player.id,
      question.questionData.id,
      choice.content,
      index
    );
    setIsAnswer(true);
    setPlayerChoice(choice);
  };

  const findIndexPlayerChoice = (element) => element.content === playerChoice.content;


  return (
    <div className="player-question">
      <div className="logoSlave">SpaceShoot!</div>
      {isLoading && (
        <div>
          <RingLoader
            className="animationImg"
            color="#FFD080"
            size="10rem"
          ></RingLoader>
        </div>
      )}

      {!isLoading && question && !isAnswer && !timeOut && (
        <div>
          {/* <div className="title">SpaceShoot!</div> */}
          <div className="player-question__detail">
            <div className="player-question__detail__info">
              <div className="player-question__detail__info__number">
                <div className="player-question__detail__info__number_text">
                  Question{" "}
                </div>
                <div className="player-question__detail__info__number_number">
                  {" "}
                  {question.questionIndex + 1}/{question.questionLength}
                </div>
              </div>
              <div className="player-question__detail__info__question-content">
                {question.questionData.content}
              </div>

              <div></div>
            </div>
            <div className="player-question__detail__question">
              <div className="player-question__detail__question__number">
                <div className="player-question__detail__question__number_text">
                  Point
                </div>
                <div className="player-question__detail__question__number_number">
                  {player.score}
                </div>
              </div>
              <img
                src={
                  question.questionData.imgPath
                    ? question.questionData.imgPath
                    : "/images/noImage.png"
                }
                alt={"test"}
              ></img>

              <div></div>
            </div>

            <div className="player-question__detail-choices">
              <AnswerChoices
                choices={question.questionData.choices}
                clickHandle={_handlePlayerAnswer}
                role={"player"}
              />
            </div>
          </div>
        </div>
      )}

      {!isLoading && isAnswer && !timeOut && (
        <div className="answerDone">Your answer has been submitted</div>
      )}

      {!isLoading && isAnswer && timeOut && (
        <PlayerQuestionResult
          isCorrect={
            question.questionData.correctAnswer === playerChoice.content
          }
          score={player.score}
          playerChoiceIndex={question.questionData.choices.findIndex(findIndexPlayerChoice)}
        />
      )}

      {!isLoading && timeOut && !isAnswer && (
        <div className="answerDone">You have not answered the question</div>
      )}
    </div>
  );
};

export default PlayerQuestionPage;
