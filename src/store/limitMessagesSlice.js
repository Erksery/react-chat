import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesLimit: 50,
};

export const limitMessagesSlice = createSlice({
  name: "limit",
  initialState,
  reducers: {
    setMessagesLimit: (state, action) => {
      state.messagesLimit += 50;
    },
  },
});

export const { setMessagesLimit } = limitMessagesSlice.actions;

export default limitMessagesSlice.reducer;
