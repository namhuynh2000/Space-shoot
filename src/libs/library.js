export const checkPlayerExist = (state) => {
  if (!state.room || !state.name) return false;
  return true;
};

export const countPlayerAnswers = (AnswerList, answer) => {
  let count = 0;
  AnswerList.forEach((ans) => {
    if (ans.answer === answer) {
      ++count;
    }
  });
  return count;
};

export const generateImage = (imagePath) => {
  if (imagePath) return imagePath;
  return "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png";
};
