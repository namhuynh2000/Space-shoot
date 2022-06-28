import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../connections/socket";
import { Link } from "react-router-dom";
import "./index.scss";
import { selectHost } from "../../../redux/reducers/hostReducer";
import { useSelector } from "react-redux";
import User from "../../../components/User/User";
import { BiAddToQueue } from 'react-icons/bi';
import { HiOutlinePlay } from 'react-icons/hi';
import { TiDeleteOutline } from 'react-icons/ti';
import FrameHost from "../../../components/FrameHost/FrameHost";


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
      <User className="user" />
      <FrameHost>
        <div className="header">
          <div className="numberQuiz">Total Quizs <span>{quizList.length}</span></div>
          <div className="title">List Quizs</div>
          <Link to={"/host/create"}>
            <button className="createButton">
              <BiAddToQueue />
              Create Quiz</button>
          </Link>
        </div>
        <div className="listQuiz">
          <ul className="myList">
            {quizList &&
              quizList.map((item) => (
                <li
                  className="quizDetail"
                  key={item._id}
                >
                  <img
                    className="imgQuiz"
                    src={item.imgPath}
                    alt="background"
                  ></img>
                  <div className="contentQuiz">
                    <Link to="/host/edit">
                      <div className="quizName">{item.name}</div>
                    </Link>
                    <div className="quizButton">
                      <div className="playBtn" onClick={() => _handleClickToHostGame(item._id)}><HiOutlinePlay />Play</div>
                      <div className="deleteBtn"><TiDeleteOutline />Delete</div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </FrameHost>
      {/* <div className="listQuizWrap">
        <img className="planetIcon" src="images/Planet-1.png" alt="planetIcon" />
        <img className="starIcon" src="images/Star2.png" alt="starIcon" />
        <div className="header">
          <div className="numberQuiz">Total Quizs <span>{quizList.length}</span></div>
          <div className="title">List Quizs</div>
          <Link to={"/host/create"}>
            <button className="createButton">
              <BiAddToQueue />
              Create Quiz</button>
          </Link>
        </div>
        <div className="listQuiz">
          <ul className="myList">
            {quizList &&
              quizList.map((item) => (
                <li
                  className="quizDetail"
                  key={item._id}
                >
                  <img
                    className="imgQuiz"
                    src={item.imgPath}
                    alt="background"
                  ></img>
                  <div className="contentQuiz">
                    <Link to="/host/edit">
                      <div className="quizName">{item.name}</div>
                    </Link>
                    <div className="quizButton">
                      <div className="playBtn" onClick={() => _handleClickToHostGame(item._id)}><HiOutlinePlay />Play</div>
                      <div className="deleteBtn"><TiDeleteOutline />Delete</div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
}
