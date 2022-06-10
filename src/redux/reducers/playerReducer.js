import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: {
    score: 0,
    name: "",
    room: "",
    id: "",
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
    setReduxPlayerId: (state, action) => {
      state.player.id = action.payload;
    },
    setReduxPlayer: (state, action) => {
      state.player = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setReduxPlayerScore,
  setReduxPlayerName,
  setReduxPlayerRoom,
  setReduxPlayer,
  setReduxPlayerId,
  isExisted,
} = playerSlice.actions;

export const selectPlayer = (state) => state.player.player;
export default playerSlice.reducer;
