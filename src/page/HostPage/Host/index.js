import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../connections/socket";
import { Link } from "react-router-dom";
export default function HostPage() {
  const [quizList, setQuizList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (socket.room) {
      delete socket.room;
      socket.disconnect();
      return;
    }

    function handleFetchQuizListRes(payload) {
      console.log(payload);
      setQuizList(payload);
    }

    socket.emit("fetchQuizList");

    socket.on("fetchQuizListRes", handleFetchQuizListRes);

    return () => {
      socket.off("fetchQuizListRes", handleFetchQuizListRes);
    };
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
            <li key={item._id} onClick={() => _handleClickToHostGame(item._id)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
      <Link to="/host/create">Create Page</Link>
    </div>
  );
}
