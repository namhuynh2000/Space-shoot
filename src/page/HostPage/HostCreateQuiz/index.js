import React, { useCallback, useEffect, useReducer, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { reducer, initState, initFunc } from "../../../Reducer/createForm";

// Components
const HostCreateQuizPage = ({ quiz }) => {
  const [state, dispatch] = useReducer(reducer, initState, initFunc);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (quiz)
      dispatch({
        type: "init",
        payload: quiz,
      });
    return;
  }, [quiz]);

  const validateForm = useCallback(() => {
    if (!state.name) {
      setDisable(true);
      return;
    }

    for (let question of state.questions) {
      if (!question.content) {
        setDisable(true);
        return;
      }
      let count = 0;
      for (let choice of question.choices) {
        if (choice.content) count++;
      }
      if (count < 2) {
        setDisable(true);
        return;
      }

      if (!question.correctAnswer) {
        setDisable(true);
        return;
      }
    }
    setDisable(false);
  }, [state]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

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
    setQuestionIndex((oldIndex) => oldIndex + 1);
  };

  const _handleSaveClick = () => {
    console.log(state);
  };

  // const _handleExitClick = () => {
  //   navigate("/host");
  // };

  const _handleDeleteQuestionClick = () => {
    dispatch({
      type: "deleteQuestion",
      payload: questionIndex,
    });
    setQuestionIndex((oldIndex) => oldIndex - 1);
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
              // onClick={_handleExitClick}
              className="host-create__btn host-create__btn--no-bg"
            >
              Exit
            </Link>
            <button
              className={
                !disable ? "host-create__btn" : "host-create__btn disable"
              }
              onClick={_handleSaveClick}
            >
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
              {state.questions[questionIndex].choices.map((ans, index) => {
                return (
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
                        checked={
                          state.questions[questionIndex].correctAnswer ===
                          ans.content
                        }
                        onChange={_handleCorrectAnswerInputOnChange}
                      />
                    </div>
                  </li>
                );
              })}
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
        <button
          className={!disable ? "host-create__btn" : "host-create__btn disable"}
          onClick={_handleAddQuestionClick}
        >
          Add question
        </button>

        <button
          className={
            questionIndex !== 0
              ? "host-create__btn"
              : "host-create__btn disable"
          }
          onClick={_handleDeleteQuestionClick}
        >
          Delete question
        </button>
      </div>
    </div>
  );
};

export default HostCreateQuizPage;
