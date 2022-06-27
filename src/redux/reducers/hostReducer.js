import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  host: {
    id: "",
    imagePath: "",
    name: "",
  },
};

export const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    setReduxHost: (state, action) => {
      state.host = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReduxHost } = hostSlice.actions;

export const selectHost = (state) => state.host.host;
export default hostSlice.reducer;
