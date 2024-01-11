import { configureStore } from "@reduxjs/toolkit";
import allertSlice from "./allertSlice";

export const store = configureStore({
  reducer: {
    allertStore: allertSlice,
  },
});
