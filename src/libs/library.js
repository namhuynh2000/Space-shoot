export const checkPlayerExist = (state) => {
  if (!state.room || !state.name) return false;
  return true;
};


export const countPlayerAnswers =(AnswerList,answer) =>
{
  let count = 0;
  AnswerList.forEach(ans=> {
    if (ans.answer === answer) {
      ++count
    }
  })
  return count;
}
