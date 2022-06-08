import './index.scss';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import socket from '../../../connections/socket';
import { selectHost } from '../../../redux/reducers/hostReducer';

const HostQuestionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [isEnd,setIsEnd] = useState(false);
  const [questionCountDown,setQuestionCountDown] = useState(20);
  const [params] = useSearchParams();
  const { room } = useSelector(selectHost);

  const [playerAnswers, setPlayerAnswers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!room) {
      navigate("/");
    }
  }, [room]);

  useEffect(() => {
    const questionIndex = params.get("question") ? params.get("question") : 1;
    let interval=null;


    setTimeout(()=>{
      socket.emit("getQuestion", room, questionIndex);
    },4000)



    socket.on("getQuestionRes", (res) => {
      if (res.result) {
        setQuestion(res.questionData);
        setIsLoading(false);
        let countDown = 20;
        interval = setInterval(()=>{
          if(countDown === -1)
          {
            socket.emit("stopQuestion",room,questionIndex)
            clearInterval(interval);
          }
          else{
            setQuestionCountDown(--countDown);
          }},1000)
      }
      else {
        alert("Start question failed");
        navigate("/");
      }
    });

    socket.on("playerAnswerRes", (playerAnswerList) => {
      console.log(playerAnswerList);
      setPlayerAnswers(playerAnswerList);
    });

    socket.on("questionTimeOut",(playerAnswersList)=>{
      setIsEnd(true);

    })

    return (()=>{
      clearInterval(interval);
    })
  }, []);



  return (
    <div className="hostQuestionPage">
      {!isEnd && isLoading  && (
        <div>
          <p>Question {question.id}</p>
          <div  className="progress"></div>
        </div>
      )}

      {!isEnd && !isLoading && question && (
        <div className="hostQuestionDetail">
          <h1>{question.content}</h1>

          <div className="hostQuestionInfo">
            <span>{questionCountDown}</span>
            <span className="playerAnswers">
              <p>{playerAnswers.length}</p>
              <p>Answers</p>
            </span>
          </div>
          <ul className="hostQuestionChoices">
            {question.choices.map((choice, index) => (
              <li key={index}>{choice.content}</li>
            ))}
          </ul>
        </div>
      )}

      {isEnd && (
          <p>Result</p>
      )}
    </div>
  );
};

export default HostQuestionPage;
