import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { ImCross } from "react-icons/im";
const PlayerQuestionResult = ({ isCorrect, score }) => {
  return (
    <div>
      {isCorrect && <AiOutlineCheck />}
      {!isCorrect && <ImCross />}
      <p>{score}</p>
    </div>
  );
};

export default PlayerQuestionResult;
