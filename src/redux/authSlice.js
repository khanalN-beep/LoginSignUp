import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignUp: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleSignUp: (state) => {
      state.isSignUp = !state.isSignUp;
    },
  },
});

export const { toggleSignUp } = authSlice.actions;
export default authSlice.reducer;
