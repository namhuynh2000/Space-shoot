import React from "react";
import "./QuestionControlButton.scss";
import { ReactComponent as NextIcon } from "../../Icons/nextIcon.svg";
const QuestionControlButton = ({ clickHandle, content }) => {
  return (
    <div className="nextButton" onClick={clickHandle}>
      <NextIcon></NextIcon>
      <div>{content}</div>

    </div>

  );
};

export default QuestionControlButton;
