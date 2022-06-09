import "./index.scss";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import socket from "../../../connections/socket";
import { selectHost } from "../../../redux/reducers/hostReducer";
import { countPlayerAnswers } from "../../../libs/library";

const HostQuestionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const [questionCountDown, setQuestionCountDown] = useState(20);
  const [params] = useSearchParams();
  const { room } = useSelector(selectHost);

  const resultRef = useRef(null);
  const [totalAnswer, setTotalAnswer] = useState({
    id: "",
    playerAnswers: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!room) {
      navigate("/");
    }
  }, [room]);

  useEffect(() => {
    const questionIndex = params.get("question") ? params.get("question") : 1;
    let interval = null;

    setTimeout(() => {
      socket.emit("getQuestion", room, questionIndex);
    }, 4000);

    socket.on("getQuestionRes", (res) => {
      if (res.result) {
        setQuestion(res.questionData);
        setIsLoading(false);
        let countDown = 5;
        setQuestionCountDown(countDown);
        interval = setInterval(() => {
          if (countDown === 0) {
            socket.emit("stopQuestion", room, questionIndex);
            clearInterval(interval);
          } else {
            setQuestionCountDown(--countDown);
          }
        }, 1000);
      } else {
        alert("Start question failed");
        navigate("/");
      }
    });

    socket.on("playerAnswerRes", (playerAnswerList) => {
      console.log(playerAnswerList);
      setTotalAnswer(playerAnswerList);
    });

    socket.on("questionTimeOut", () => {
      console.log("Time out");
      setIsEnd(true);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (totalAnswer.playerAnswers.length === 0) return;

    if (resultRef.current) {
      const list = resultRef.current;
      const items = resultRef.current.children;

      console.log(items);
      const totalResult = totalAnswer.playerAnswers.length;

      Array.from(items).forEach((item, index) => {
        const itemHeight =
          (countPlayerAnswers(
            totalAnswer.playerAnswers,
            question.choices[index].content
          ) *
            100) /
          totalResult;
        console.log(itemHeight);
        item.children[0].style.height = itemHeight ? itemHeight + "%" : "10%";
      });
    }
  }, [totalAnswer, isEnd]);

  return (
    <div className="host-question">
      {!isEnd && isLoading && (
        <div>
          <p>Question {question.id}</p>
          <div className="host-question__progress"></div>
        </div>
      )}

      {!isLoading && question && (
        <div className="host-question__detail">
          <h1>{question.content}</h1>

          {!isEnd && (
            <div className="host-question__detail-info">
              <span>{questionCountDown}</span>
              <span>
                <p>{totalAnswer?.playerAnswers?.length ?? 0}</p>
                <p>Answers</p>
              </span>
            </div>
          )}

          {isEnd && (
            <ul className={"host-question__result"} ref={resultRef}>
              {question.choices.map((choice, index) => (
                <li key={index}>
                  <div className="host-question__result-percentage">
                    <p className="host-question__result-count">
                      {countPlayerAnswers(
                        totalAnswer.playerAnswers,
                        choice.content
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <ul
            className={
              isEnd
                ? "host-question__choices host-question__choices--disabled"
                : "host-question__choices"
            }
          >
            {question.choices.map((choice, index) => (
              <li key={index}>{choice.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HostQuestionPage;
