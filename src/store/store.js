import { configureStore } from "@reduxjs/toolkit";
import allertSlice from "./allertSlice";
import onlineUsersSlice from "./onlineUsersSlice";

export const store = configureStore({
  reducer: {
    allertStore: allertSlice,
    onlineUsersStore: onlineUsersSlice,
  },
});
