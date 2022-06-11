import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../connections/socket";
import { Link } from "react-router-dom";
export default function HostPage() {
  const [quizList, setQuizList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("fetchQuizList");

    socket.on("fetchQuizListRes", (payload) => {
      setQuizList(payload);
    });
  }, []);

  const _handleClickToHostGame = (id) => {
    navigate(`/host/lobby/?quizId=${id}`);
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
      <Link to="/host/create">Create Page</Link>
    </div>
  );
}
