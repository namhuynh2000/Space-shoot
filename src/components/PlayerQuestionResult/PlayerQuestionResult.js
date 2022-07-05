import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { ImCross } from "react-icons/im";
const PlayerQuestionResult = ({ isCorrect, score, rank }) => {
  return (
    <div>
      {isCorrect && <AiOutlineCheck />}
      {!isCorrect && <ImCross />}
      <p>{score}</p>
      <p>{rank}</p>
    </div>
  );
};

export default PlayerQuestionResult;
