import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../../connections/socket";
import {
  setReduxPlayerRole,
  setReduxPlayerRoom,
} from "../../redux/reducers/userReducer";

export default function HostPage() {
  const [quizList, setQuizList] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("fetchQuizList");

    socket.on("fetchQuizListRes", (payload) => {
      setQuizList(payload);
    });

    socket.on("hostGameRes", (payload) => {
      if (payload.result) {
        console.log(payload);
        dispatch(setReduxPlayerRole("Host"));
        dispatch(setReduxPlayerRoom(payload.game.roomId));
        navigate(`/host/lobby/?quizId=${payload.game.quizId}`);
      }
    });
  }, [socket]);

  const _handleClickToHostGame = (id) => {
    socket.emit("hostGame", id);
  };

  return (
    <div>
      <h1>List of created quiz: </h1>
      {quizList && (
        <ul>
          {quizList.map((item) => (
            <li key={item.id} onClick={() => _handleClickToHostGame(item.id)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
