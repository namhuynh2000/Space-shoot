import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { reducer, initState, initFunc } from "../../../Reducer/createForm";
import { useSelector } from "react-redux";
import { selectHost } from "../../../redux/reducers/hostReducer";
import socket from "../../../connections/socket";
import FrameHost from "../../../components/FrameHost/FrameHost";
import User from "../../../components/User/User";
import { ReactComponent as ExitLogo } from "../../../Icons/exitIcon.svg";
import { ReactComponent as SaveLogo } from "../../../Icons/saveIcon.svg";
import { ReactComponent as Polygon } from "../../../Icons/Polygon.svg";
import { ReactComponent as Rectangle } from "../../../Icons/Rectangle.svg";
import { ReactComponent as Rectangle2 } from "../../../Icons/Rectangle2.svg";
import { ReactComponent as Ellipse } from "../../../Icons/Ellipse.svg";
import { TiDeleteOutline } from "react-icons/ti";
import { ReactComponent as PlusIcon } from "../../../Icons/plus-circle.svg";
import { ReactComponent as DeleteIcon } from "../../../Icons/x-circle.svg";
import { storage } from "../../../fire";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";

// Components
const HostCreateQuizPage = ({ quiz }) => {
  const [state, dispatch] = useReducer(reducer, initState, initFunc);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [disable, setDisable] = useState(false);
  const [imgUpload, setImgUpload] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const host = useSelector(selectHost);
  const navigate = useNavigate();

  const imgRef = useRef(null);

  const inputFileRef = useRef(null);

  useEffect(() => {
    const handleCreateGameResult = ({ message }) => {
      if (message === "success") {
        setIsSuccess(true);
        toast.success("Game created successfully", {
          onClose: () => {
            navigate("/host");
          },
        });
      } else {
        toast.error("Game created failed");
      }
    };

    socket.on("createGameResult", handleCreateGameResult);

    return () => {
      socket.off("createGameResult", handleCreateGameResult);
    };
  }, [navigate]);

  useEffect(() => {
    console.log(host, 1);
    dispatch({
      type: "setUserId",
      payload: { userId: host.id },
    });
  }, [host]);

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

  const _handleSaveClick = async () => {
    const sendData = { ...state };
    for (let i = 0; i < sendData.questions.length; i++) {
      if (sendData.questions[i].imgPath) {
        console.log(imgUpload[i]);
        const imgRef = ref(storage, `images/${imgUpload[i].name}`);
        const snapshot = await uploadBytes(imgRef, imgUpload[i]);
        console.log(snapshot);
        const url = await getDownloadURL(snapshot.ref);
        sendData.questions[i].imgPath = url;
      }
    }

    socket.emit("createGame", sendData);
  };

  const _handleDeleteQuestionClick = () => {
    dispatch({
      type: "deleteQuestion",
      payload: questionIndex,
    });
    setQuestionIndex((oldIndex) => oldIndex - 1);
  };

  const _handleImgImport = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }

    console.log("Importerrrrrr");
  };

  const _handleLoadImg = () => {
    if (inputFileRef.current) {
      const imageUrl = URL.createObjectURL(inputFileRef.current.files[0]);

      setImgUpload((imgUpload) => {
        return {
          ...imgUpload,
          [questionIndex]: inputFileRef.current.files[0],
        };
      });
      dispatch({
        type: "updateQuestionImg",
        payload: { questionIndex, imgPath: imageUrl },
      });
    }
  };

  return (
    <div className="host-create">
      {isSuccess && (
        <div className="layout" onClick={() => navigate("/host")}></div>
      )}
      <ToastContainer />
      <div className="logoSlave">SpaceShoot!</div>
      <User className="user" />
      <FrameHost>
        <div className="host-create__header">
          <input
            type="text"
            className="host-create__quiz-name"
            value={state.name}
            placeholder="Enter your quiz title"
            onChange={_handleTitleInputOnChange}
          />
          <div className="host-create__header-buttons">
            <div
              className={
                !disable ? "host-create__btn" : "host-create__btn disable"
              }
              onClick={_handleSaveClick}
            >
              <SaveLogo></SaveLogo>
              <p>Save</p>
            </div>
            <Link
              to="/host"
              // onClick={_handleExitClick}
              className="host-exit__btn host-exit__btn--no-bg"
            >
              <ExitLogo></ExitLogo>
              <p>Exit</p>
            </Link>
          </div>
        </div>

        <div className="host-create__body">
          <div className="host-create__body__header">
            <div className="numberQuestion">
              Question{" "}
              <span>
                {questionIndex + 1} / {state.questions.length}
              </span>
              <ul className="anotherQuestion">
                {state.questions.map((ques, index) => (
                  <li
                    key={index}
                    onClick={() => _handleQuestionItemClick(index)}
                    className={
                      index === questionIndex
                        ? "numberAnotherQuestion numberAnotherQuestion--active"
                        : "numberAnotherQuestion"
                    }
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="host-create__bottom">
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
            </div> */}
            <input
              type="text"
              className="host-create__question-name"
              value={state.questions[questionIndex].content}
              placeholder="Enter your question"
              onChange={_handleQuestionInputOnChange}
            />

            <div className="host-create__question-button">
              <button
                className={
                  !disable
                    ? "host-create__btn-add"
                    : "host-create__btn-add disable"
                }
                onClick={_handleAddQuestionClick}
              >
                <PlusIcon />
                Add
              </button>

              <button
                className={
                  questionIndex !== 0
                    ? "host-create__btn-delete"
                    : "host-create__btn-delete disable"
                }
                onClick={_handleDeleteQuestionClick}
              >
                <DeleteIcon />
                Delete
              </button>
            </div>
          </div>

          <div className="host-create__image">
            <img
              src={
                state.questions[questionIndex].imgPath
                  ? state.questions[questionIndex].imgPath
                  : "/images/importImage.png"
              }
              alt="imagesQuestion"
              ref={imgRef}
              onClick={_handleImgImport}
            />
            <input type="file" ref={inputFileRef} onChange={_handleLoadImg} />
          </div>

          <form>
            <ul className="host-create__answers">
              {state.questions[questionIndex].choices.map((ans, index) => {
                return (
                  <li key={index}>
                    <div className="logo">
                      {index === 0 && <Polygon></Polygon>}
                      {index === 1 && <Rectangle2></Rectangle2>}
                      {index === 2 && <Rectangle></Rectangle>}
                      {index === 3 && <Ellipse></Ellipse>}
                    </div>
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
                          state.questions[questionIndex].correctAnswer &&
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
      </FrameHost>
    </div>
  );
};

export default HostCreateQuizPage;
