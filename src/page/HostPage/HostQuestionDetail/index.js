import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../connections/socket";
import { Link } from "react-router-dom";
import "./index.scss";
import { selectHost } from "../../../redux/reducers/hostReducer";
import { useSelector } from "react-redux";
import User from "../../../components/User/User";
import { ReactComponent as PlayIcon } from "../../../Icons/playIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../Icons/deleteIcon.svg";
import { ReactComponent as DeleteItem } from "../../../Icons/deleteItem.svg";
import { ReactComponent as AddLogo } from "../../../Icons/addIcon.svg";
import { ReactComponent as ChamIcon } from "../../../Icons/3cham.svg";
import FrameHost from "../../../components/FrameHost/FrameHost";

import { ToastContainer } from "react-toastify";
export default function HostQuestionDetail() {
  const [quizList, setQuizList] = useState([]);
  const host = useSelector(selectHost);
  const navigate = useNavigate();

 
  useEffect(() => {});

  return (
    <div className="hostContainer">
      <ToastContainer />
      <div className="logoSlave">SpaceShoot!</div>
      <User className="user" />
      <div className="questionDetail">
      <FrameHost>
        <div className="detailInfo">
          <img className="detailInfo__image" src="https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"/>
          <p className="detailInfo__title">Tittle: Lion - tiger</p>
          <div className="detailInfo__buttons">
            <div
              className="playButton"
            >
              <PlayIcon></PlayIcon>
              <p>Play</p>
            </div>
            <div
              className="deleteButton"
            >
              <DeleteIcon></DeleteIcon>
              <p>Delete</p>
            </div>
          </div>


        </div>

      
        <div className="listQuestion">
          <div className="listQuestion__header">
            <p>List Question</p>
            <AddLogo className="listQuestion__header__addIcon"></AddLogo>
          </div>
          <ul className="listQuestion__list">
            <li className="listQuestion__list__item">
              <ChamIcon></ChamIcon>
              <img src="https://sym.edu.vn/wp-content/uploads/2021/03/elephant-2.jpg"></img>
              <p>Name Question</p>
              <DeleteItem className="listQuestion__list__item__deleteIcon"></DeleteItem>
            </li>
            <li className="listQuestion__list__item">
              <ChamIcon></ChamIcon>
              <img src="https://sym.edu.vn/wp-content/uploads/2021/03/elephant-2.jpg"></img>
              <p>Name Question</p>
              <DeleteItem className="listQuestion__list__item__deleteIcon"></DeleteItem>
            </li>
            
          </ul>
        </div>
      </FrameHost>
      </div>

    </div>
  );
}
