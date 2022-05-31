import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    score: 0,
    playerName: "",
    room: "",
    role: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReduxPlayerScore: (state, action) => {
      state.user.score += action.payload;
    },

    setReduxPlayerName: (state, action) => {
      state.user.playerName = action.payload;
    },

    setReduxPlayerRoom: (state, action) => {
      state.user.room = action.payload;
    },

    setReduxPlayerRole: (state, action) => {
      state.user.role = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setReduxPlayerScore,
  setReduxPlayerName,
  setReduxPlayerRoom,
  setReduxPlayerRole,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
