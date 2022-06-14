import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/playerReducer";
export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
