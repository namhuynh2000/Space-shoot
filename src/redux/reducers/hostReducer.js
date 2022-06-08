import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  host: {
    room: "",
    gameName: "",
  },
};

export const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    setReduxHostRoom: (state, action) => {
      state.host.room = action.payload;
    },
    setReduxHostGame: (state, action) => {
      state.host.gameName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReduxHostGame, setReduxHostRoom } = hostSlice.actions;

export const selectHost = (state) => state.host.host;
export default hostSlice.reducer;
