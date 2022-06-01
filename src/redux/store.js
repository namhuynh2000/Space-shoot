import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/playerReducer";
import hostReducer from "./reducers/hostReducer";
export const store = configureStore({
  reducer: {
    player: playerReducer,
    host: hostReducer,
  },
});
