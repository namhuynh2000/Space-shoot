const initState = {
  name: "",
  questions: [
    {
      id: "1",
      content: "",
      choices: Array.from(Array(4).keys()).map(() => {
        return { content: "" };
      }),
      correctAnswer: "",
    },
  ],
  userId: "",
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
    id: `${questions.length + 1}`,
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

export { reducer, initState };
