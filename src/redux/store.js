import { configureStore } from "@reduxjs/toolkit";
import hostReducer from "./reducers/hostReducer";
import playerReducer from "./reducers/playerReducer";
export const store = configureStore({
  reducer: {
    player: playerReducer,
    host: hostReducer,
  },
});
