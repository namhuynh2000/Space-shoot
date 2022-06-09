import React, { useEffect, useRef } from "react";
import "./AnswerChar.scss";
import { countPlayerAnswers } from "../../libs/library";
import { FaCheck } from "react-icons/fa";
const AnswerChar = ({ choices, playerAnswers, correctAnswer }) => {
  const resultRef = useRef(null);

  useEffect(() => {
    if (resultRef.current) {
      const items = resultRef.current.children;

      console.log(items);
      const totalResult = playerAnswers.length;

      Array.from(items).forEach((item, index) => {
        const itemHeight =
          (countPlayerAnswers(playerAnswers, choices[index].content) * 100) /
          totalResult;
        console.log(itemHeight);
        item.children[0].style.height = itemHeight ? itemHeight + "%" : "10%";
      });
    }
  }, [playerAnswers, choices]);

  return (
    <ul className={"question__result"} ref={resultRef}>
      {choices.map((choice, index) => (
        <li key={index}>
          <div className="question__result-percentage">
            <p className="question__result-count">
              {choice.content === correctAnswer && <FaCheck />}
              {countPlayerAnswers(playerAnswers, choice.content)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AnswerChar;
