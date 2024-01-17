import { configureStore } from "@reduxjs/toolkit";
import allertSlice from "./allertSlice";
import onlineUsersSlice from "./onlineUsersSlice";
import limitMessagesSlice from "./limitMessagesSlice";

export const store = configureStore({
  reducer: {
    allertStore: allertSlice,
    onlineUsersStore: onlineUsersSlice,
    limitMessagesStore: limitMessagesSlice,
  },
});
