import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../connections/socket";

export default function HostPage() {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("fetchQuizList");

    socket.on("fetchQuizListRes", (payload) => {
      setQuizList(payload);
    });

    socket.on("hostGameRes", (payload) => {
      if (payload.result) {
        navigate(`/host/lobby/${payload.game.id}`);
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
