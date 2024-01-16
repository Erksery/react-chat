import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: {},
};

export const onlineUsersSlice = createSlice({
  name: "online",
  initialState,
  reducers: {
    addOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { addOnlineUsers } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
