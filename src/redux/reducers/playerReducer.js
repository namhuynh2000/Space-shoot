import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: {
    score: 0,
    playerName: "",
    room: "",
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setReduxPlayerScore: (state, action) => {
      state.player.score += action.payload;
    },

    setReduxPlayerName: (state, action) => {
      state.player.playerName = action.payload;
    },

    setReduxPlayerRoom: (state, action) => {
      state.player.room = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setReduxPlayerScore,
  setReduxPlayerName,
  setReduxPlayerRoom,
  isExisted,
} = playerSlice.actions;

export const selectPlayer = (state) => state.player.player;
export default playerSlice.reducer;
