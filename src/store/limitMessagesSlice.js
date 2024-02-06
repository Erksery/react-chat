import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesLimit: 100,
};

export const limitMessagesSlice = createSlice({
  name: "limit",
  initialState,
  reducers: {
    setMessagesLimit: (state, action) => {
      state.messagesLimit += 100;
    },
  },
});

export const { setMessagesLimit } = limitMessagesSlice.actions;

export default limitMessagesSlice.reducer;
