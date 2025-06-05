"use client";
import { createSlice } from "@reduxjs/toolkit";

interface crumbInterface {
  title: string;
  action?: () => void;
}

interface InitialValuesInterface {
  crumbs: Array<crumbInterface>;
  prePath: string;
}

const initState: InitialValuesInterface = {
  crumbs: [],
  prePath: "",
};

export const breadCrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: initState,
  reducers: {
    setBreadCrumb: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetBreadCrumb: () => initState,
  },
});

export const { setBreadCrumb, resetBreadCrumb } = breadCrumbSlice.actions;

export default breadCrumbSlice.reducer;
