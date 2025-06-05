"use client";
import { createSlice } from "@reduxjs/toolkit";

const initState: any = {
  user: {},
  isLoggedIn: false,
  token: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setAuthReducer: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetAuthReducer: () => initState,
  },
});

export const { setAuthReducer, resetAuthReducer } = authSlice.actions;

export default authSlice.reducer;
