import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allertText: "",
  allertStatus: 0,
};

export const allertSlice = createSlice({
  name: "allert",
  initialState,
  reducers: {
    addAllert: (state, action) => {
      state.allertText = action.payload.allertText;
      state.allertStatus = action.payload.allertStatus;
    },
  },
});

export const { addAllert } = allertSlice.actions;

export default allertSlice.reducer;
