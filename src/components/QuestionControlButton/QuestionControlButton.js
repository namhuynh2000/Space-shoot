import React from "react";
import "./QuestionControlButton.scss";
const QuestionControlButton = ({ clickHandle, content }) => {
  return (
    <button className="question-control-btn" onClick={clickHandle}>
      {content}
    </button>
  );
};

export default QuestionControlButton;
