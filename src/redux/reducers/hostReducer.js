import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  host: {
    id: "",
    photoURL: "",
    name: "",
    email: "",
  },
};

export const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    setReduxHost: (state, action) => {
      state.host = action.payload;
    },
    clearHost: (state, action) => {
      state.host = {
        id: "",
        photoURL: "",
        name: "",
        email: "",
      };
    }
  },
});



// Action creators are generated for each case reducer function
export const { setReduxHost, clearHost } = hostSlice.actions;

export const selectHost = (state) => state.host.host;
export default hostSlice.reducer;
