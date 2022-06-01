export const checkPlayerExist = (state) => {
  if (!state.room || !state.playerName) return false;
  return true;
};
