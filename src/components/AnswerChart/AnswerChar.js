import React, { useEffect, useRef, useState } from "react";
import "./AnswerChar.scss";
import { countPlayerAnswers } from "../../libs/library";
import { FaCheck } from "react-icons/fa";
const AnswerChar = ({ choices, playerAnswers, correctAnswer }) => {
  const resultRef = useRef(null);
  const [result, setResult] = useState({});
  const [totalChart, setTotalChart] = useState(0);

  useEffect(() => {
    if (resultRef.current) {
      const items = resultRef.current.children;

      console.log(items[0].getAttribute("index"));
      const totalResult = playerAnswers.length;

      let newResult = { ...result };

      Array.from(items).forEach((item, index) => {
        const count = countPlayerAnswers(
          playerAnswers,
          item.getAttribute("index")
        );
        const itemHeight = (count * 100) / totalResult;
        newResult = { ...newResult, [item.getAttribute("index")]: count };
        console.log(newResult);
        item.children[0].style.height = itemHeight ? itemHeight + "%" : "10%";
      });

      setResult(newResult);
    }
  }, [playerAnswers, choices]);

  useEffect(() => {
    let count = 0;
    choices.forEach((choice) => {
      if (choice.content) {
        count++;
      }
    });
    setTotalChart(count);
  }, [choices]);

  return (
    <ul
      className={"question__result"}
      ref={resultRef}
      // style={{ gridTemplateColumns: `repeat(${totalChart},1fr)` }}
    >
      {choices.map((choice, index) => {
        if (choice.content) {
          return (
            <li key={index} index={index}>
              <div className="question__result-percentage">
                <p className="question__result-count">
                  {choice.content === correctAnswer && <FaCheck />}
                  {result[index]}
                </p>
              </div>
            </li>
          );
        }
        return "";
      })}
    </ul>
  );
};

export default AnswerChar;
