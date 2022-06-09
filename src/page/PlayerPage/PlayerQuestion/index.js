import "./index.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import socket from "../../../connections/socket";
import {
  selectPlayer,
  setReduxPlayer,
} from "../../../redux/reducers/playerReducer";

const PlayerQuestionPage = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswer, setIsAnswer] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const navigate = useNavigate();
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("getQuestionRes", (res) => {
      if (res.result) {
        setQuestion(res.questionData);
        setIsLoading(false);
      } else {
        alert("Get question failed");
        navigate("/");
      }
    });

    socket.on("updatePlayerInfo", (playerInfo) => {
      dispatch(setReduxPlayer(playerInfo));
    });

    socket.on("questionTimeOut", () => {
      setTimeOut(true);
    });
  }, []);

  const _handlePlayerAnswer = (choice) => {
    console.log(choice);
    socket.emit("playerAnswer", player.id, question.id, choice.content);
    setIsAnswer(true);
  };

  return (
    <div className="playerQuestionPage">
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {!isLoading && question && !isAnswer && !timeOut && (
        <div className="playerQuestionDetail">
          <div className="questionInfo">
            <p>Question {question.id}</p>
          </div>
          <ul className="questionChoices">
            {question.choices.map((choice, index) => (
              <li key={index} onClick={() => _handlePlayerAnswer(choice)}>
                {choice.content}
              </li>
            ))}
          </ul>
          <div className="playerInfo">
            <p>{player.name}</p>
            <p>{player.score}</p>
          </div>
        </div>
      )}

      {!isLoading && isAnswer && !timeOut && (
        <div>Your answer has been submitted</div>
      )}

      {!isLoading && isAnswer && timeOut && <div>Score: {player.score}</div>}

      {!isLoading && timeOut && !isAnswer && (
        <div>You have not answered the question</div>
      )}
    </div>
  );
};

export default PlayerQuestionPage;
