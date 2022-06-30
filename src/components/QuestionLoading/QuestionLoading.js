import React from "react";
import "./QuestionLoading.scss";
export const QuestionLoading = ({ duration }) => {
  return (
    <div className="loading">
      <div
        className="process"
        style={{ animationDuration: `${duration}s` }}
      ></div>
      <img
        src="/images/rocket.png"
        style={{ animationDuration: `${duration}s` }}
        alt=""
      />
    </div>
  );
};
