import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import "./PlayerQuestionResult.scss"


const PlayerQuestionResult = ({ isCorrect, score, playerChoiceIndex }) => {
  console.log("playerChoiceIndex", playerChoiceIndex);
  var colorBackground = "#F4323C";
  var borderColor = "white";
  if (!isCorrect) {
    borderColor = "red";
  }
  switch (playerChoiceIndex) {
    case 0: {
      colorBackground = "#F4323C";
      break;
    }
    case 1: {
      colorBackground = "#0B65D2";
      break;
    }
    case 2: {
      colorBackground = "#DE9B00";
      break;
    }
    case 3: {
      colorBackground = "#237D09";
      break;
    }
  }
  return (
    <div className="playerQuestionResultContainer">
      {isCorrect && (
        <>
          <div className="textCorrect">
            Correct
          </div>
          <AiOutlineCheck className="checkIcon" />
        </>
      )}
      {!isCorrect && (
        <>
          <div className="textIncorrect">
            Incorrect
          </div>
          <ImCross className="xIcon" />
        </>
      )}
      <p style={{backgroundColor: colorBackground}}>{score}</p>
      {/* <p>{rank}</p> */}
    </div>
  );
};

export default PlayerQuestionResult;
