import React from "react";
import "./AnswerChoices.scss";
const AnswerChoices = ({ choices, clickHandle, disabled, role }) => {
  const _choiceClickHandle = (choice) => {
    if (clickHandle) {
      clickHandle(choice);
    }
  };
  return (
    <ul className={disabled ? "choices choices--disabled" : "choices"}>
      {choices.map((choice, index) => {
        if (choice.content)
          return (
            <li
              key={index}
              onClick={() => {
                _choiceClickHandle(choice);
              }}
            >
              {role !== "player" ? `${choice.content}` : ""}
            </li>
          );

        return "";
      })}
    </ul>
  );
};

export default AnswerChoices;
