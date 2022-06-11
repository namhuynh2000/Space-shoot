import React, { useEffect, useReducer, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
const initState = {
  name: "",
  questions: [
    {
      content: "",
      choices: Array.from(Array(4).keys()).map(() => {
        return { content: "" };
      }),
      correctAnswer: "",
    },
  ],
};

const updateQuestionAnswers = (state, action) => {
  const answers = [...state.questions[action.payload.questionIndex].choices];
  answers[action.payload.ansIndex].content = action.payload.content;

  const questions = [...state.questions];
  questions[action.payload.questionIndex].choices = answers;
  return {
    ...state,
    questions,
  };
};

const updateQuestionContent = (state, action) => {
  const questions = [...state.questions];
  questions[action.payload.questionIndex].content = action.payload.content;

  return { ...state, questions: questions };
};

const updateQuestionCorrectAnswer = (state, action) => {
  const questions = [...state.questions];
  questions[action.payload.questionIndex].correctAnswer =
    action.payload.correctAnswer;

  return { ...state, questions: questions };
};

const addQuestion = (state) => {
  const questions = [...state.questions];

  const newQuestion = {
    content: "",
    choices: Array.from(Array(4).keys()).map(() => {
      return { content: "" };
    }),
    correctAnswer: "",
  };
  questions.push(newQuestion);
  return { ...state, questions: questions };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      if (action.payload) return action.payload;
      else return state;
    case "updateName":
      return { ...state, name: action.payload };
    case "updateQuestionContent":
      return updateQuestionContent(state, action);
    case "updateQuestionAnswer":
      return updateQuestionAnswers(state, action);

    case "updateQuestionCorrectAnswer":
      return updateQuestionCorrectAnswer(state, action);
    case "addQuestion":
      return addQuestion(state);
    default:
      throw new Error();
  }
};

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
