import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../connections/socket";
import { Link } from "react-router-dom";
import "./index.scss";
import { selectHost } from "../../../redux/reducers/hostReducer";
import { useSelector } from "react-redux";
import User from "../../../components/User/User";


export default function HostPage() {
  const [quizList, setQuizList] = useState([]);
  const host = useSelector(selectHost);
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

    socket.emit("fetchQuizList", host.id);

    socket.on("fetchQuizListRes", handleFetchQuizListRes);

    return () => {
      socket.off("fetchQuizListRes", handleFetchQuizListRes);
    };
  }, []);

  const _handleClickToHostGame = (id) => {
    navigate(`/host/lobby/?quizId=${id}`);
  };


  return (
    <div className="hostContainer">
      <div className="logoSlave">SpaceShoot!</div>
      <User className="user"/>
      {/* <div className="user">
        <div className="user-avt">
          <img src={host.photoURL} alt="avatar" />
        </div>
        <div className="user-name">
          {host.name}
        </div>
      </div> */}
      <Link className="linkToCreate" to={"/host/create"}>
        <img
          className="imgCreate"
          alt="quizgame Backgroud"
          src="https://previews.123rf.com/images/olegback/olegback2010/olegback201000068/157631503-.jpg"
        ></img>
        <button className="createButton">Create game</button>
      </Link>

      <h2>Quiz list</h2>

      <ul className="myList">
        {quizList &&
          quizList.map((item) => (
            <li
              className="myQuizList"
              key={item._id}
              onClick={() => _handleClickToHostGame(item._id)}
            >
              <img
                className="imgQuiz"
                src="https://cdn.wallpapersafari.com/94/39/wrGnD8.jpg"
                alt="background"
              ></img>
              <p className="quizName">{item.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
