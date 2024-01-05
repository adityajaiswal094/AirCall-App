import { configureStore } from "@reduxjs/toolkit";
import callReducer from "./callReducer";

export const store = configureStore({
  reducer: {
    calls: callReducer,
  },
});
