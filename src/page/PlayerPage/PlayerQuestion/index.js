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
    // socket.on("nextQuestionRes", (res) => {
    //   if (res.result) {
    //     setIsLoading(true);
    //     setTimeOut(false);
    //     setIsAnswer(false);
    //     setCurrentQuestion((old) => old + 1);
    //   } else {
    //     navigate("/summary");
    //   }
    // });

    return () => {
      socket.off("getQuestionRes", handleGetQuestionRes);
      socket.off("updatePlayerInfo", handleUpdatePlayerRes);
      socket.off("questionTimeOut", handleQuestionTimeOut);
      socket.off("nextQuestionRes", handleNextQuestionRes);
    };
  }, [currentQuestion]);

  const _handlePlayerAnswer = (choice) => {
    console.log(choice);
    socket.emit(
      "playerAnswer",
      player.id,
      question.questionData.id,
      choice.content
    );
    setIsAnswer(true);
    setPlayerChoice(choice);
  };

  return (
    <div className="player-question">
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {!isLoading && question && !isAnswer && !timeOut && (
        <div className="player-question__detail">
          <div className="player-question__detail-info">
            <p>Question Name</p>
            <p>30</p>
            <p>Point: {player.score}</p>
          </div>
          <p> Answer the question below</p>
          <div className="player-question__detail__question">
            <img></img>
            <div className="player-question__detail__question__text">
              <p>Question {question.id}/{question.length}</p>
              <text>Guy Bailey, Roy Hackett and Paul Stephenson made history in 1963, as part of a protest against a bus company that refused to employ black and Asian drivers in which UK city?</text>
            </div>
          </div>
          <p>Choose Answer</p>
          <AnswerChoices
            choices={question.questionData.choices}
            clickHandle={_handlePlayerAnswer}
            role={"player"}
          />
        </div>
      )}

      {!isLoading && isAnswer && !timeOut && (
        <div>Your answer has been submitted</div>
      )}

      {!isLoading && isAnswer && timeOut && (
        <PlayerQuestionResult
          isCorrect={
            question.questionData.correctAnswer === playerChoice.content
          }
          score={player.score}
          rank={player.rank}
        />
      )}

      {!isLoading && timeOut && !isAnswer && (
        <div>You have not answered the question</div>
      )}
    </div>
  );
};

export default PlayerQuestionPage;
