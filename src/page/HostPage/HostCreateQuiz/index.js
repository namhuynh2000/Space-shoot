import React, { useEffect, useReducer, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { reducer, initState } from "../../../Reducer/createForm";

// Components
const HostCreateQuizPage = ({ quiz }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    if (quiz)
      dispatch({
        type: "init",
        payload: quiz,
      });
    return;
  }, [quiz]);

  const _handleTitleInputOnChange = (e) => {
    dispatch({ type: "updateName", payload: e.target.value });
  };

  const _handleQuestionInputOnChange = (e) => {
    dispatch({
      type: "updateQuestionContent",
      payload: { questionIndex: questionIndex, content: e.target.value },
    });
  };

  const _handleAnswerInputOnChange = (e, index) => {
    dispatch({
      type: "updateQuestionAnswer",
      payload: {
        questionIndex,
        ansIndex: index,
        content: e.target.value,
      },
    });
  };

  const _handleCorrectAnswerInputOnChange = (e) => {
    // console.log(e.target.value);
    dispatch({
      type: "updateQuestionCorrectAnswer",
      payload: {
        questionIndex,
        correctAnswer: e.target.value,
      },
    });
  };

  const _handleQuestionItemClick = (index) => {
    setQuestionIndex(index);
  };

  const _handleAddQuestionClick = () => {
    dispatch({
      type: "addQuestion",
    });
  };

  const _handleSaveClick = () => {
    console.log(state);
  };

  return (
    <div className="host-create">
      <div className="host-create__container">
        <div className="host-create__header">
          <input
            type="text"
            className="host-create__quiz-name"
            value={state.name}
            placeholder="Enter your quiz title"
            onChange={_handleTitleInputOnChange}
          />
          <div className="host-create__header-buttons">
            <Link
              to="/host"
              className="host-create__btn host-create__btn--no-bg"
            >
              Exit
            </Link>
            <button className="host-create__btn" onClick={_handleSaveClick}>
              Save
            </button>
          </div>
        </div>

        <div className="host-create__body">
          <input
            type="text"
            className="host-create__question-name"
            value={state.questions[questionIndex].content}
            placeholder="Enter your question"
            onChange={_handleQuestionInputOnChange}
          />

          <div className="host-create--image">
            <img src="" alt="" />
          </div>

          <form>
            <ul className="host-create__answers">
              {state.questions[questionIndex].choices.map((ans, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={ans.content}
                    placeholder={`Add answer ${index + 1}`}
                    onChange={(e) => _handleAnswerInputOnChange(e, index)}
                    className="host-create__answers-content"
                  />

                  <div className="host-create__answers-correct">
                    <input
                      type="radio"
                      id={`correctAnswer${index}`}
                      name="correctAnswer"
                      value={ans.content}
                      onChange={_handleCorrectAnswerInputOnChange}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </form>
        </div>

        <div className="host-create__bottom">
          <ul className="host-create__questions-list">
            {state.questions.map((ques, index) => (
              <li
                key={index}
                onClick={() => _handleQuestionItemClick(index)}
                className={
                  index === questionIndex
                    ? "host-create__questions-item--active"
                    : ""
                }
              >
                Question {index + 1}
              </li>
            ))}
          </ul>
        </div>
        <button className="host-create__btn" onClick={_handleAddQuestionClick}>
          Add question
        </button>
      </div>
    </div>
  );
};

export default HostCreateQuizPage;
