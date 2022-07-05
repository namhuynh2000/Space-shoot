export const questionCountDownInit = 3000;
export const questionLoading = 4;

export const checkObjectEmpty = (value) => {
  return Object.keys(value).length === 0 && value.constructor === Object;
};

export const countPlayerAnswers = (AnswerList, answerIndex) => {
  console.log(answerIndex);
  let count = 0;
  AnswerList.forEach((ans) => {
    if (ans.index === +answerIndex) {
      ++count;
    }
  });
  return count;
};

export const generateImage = (imagePath) => {
  if (imagePath) return imagePath;
  return "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png";
};
