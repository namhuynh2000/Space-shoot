export const checkPlayerExist = (state) => {
  if (!state.room || !state.name) return false;
  return true;
};
