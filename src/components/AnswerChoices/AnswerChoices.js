import React from "react";
import "./AnswerChoices.scss";
import { ReactComponent as Polygon } from "../../Icons/Polygon.svg";
import { ReactComponent as Rectangle } from "../../Icons/Rectangle.svg";
import { ReactComponent as Rectangle2 } from "../../Icons/Rectangle2.svg";
import { ReactComponent as Ellipse } from "../../Icons/Ellipse.svg";
const AnswerChoices = ({ choices, clickHandle, disabled, role }) => {
  const _choiceClickHandle = (choice,index) => {
    if (clickHandle) {
      clickHandle(choice,index);
    }
  };
  return (
    <ul className={disabled ? "choices choices--disabled" : "choices"}>
      {choices.map((choice, index) => (
      
            <li
              key={index}
              onClick={() => {
                _choiceClickHandle(choice,index);
              }}
              className={role !== "player" ? !choice.content ? "hide choice--no-select": "choice--no-select" : !choice.content? "hide": ""}
            >
              <div>
                {index === 0 && <Polygon></Polygon>}
                {index === 1 && <Rectangle2></Rectangle2>}
                {index === 2 && <Rectangle></Rectangle>}
                {index === 3 && <Ellipse></Ellipse>}
              </div>
              {choice.content}
            </li>
        
      ))}
    </ul>
  );
};

export default AnswerChoices;
