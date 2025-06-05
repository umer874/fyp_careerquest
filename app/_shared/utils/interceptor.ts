"use client";
import axios from "axios";
import { resetAuthReducer } from "redux/reducers/authSlice";
import { store } from "redux/store";
import { BaseURL } from "./endpoints";

export const HTTP_CLIENT = axios.create({
  baseURL: BaseURL,
  timeout: 30000,
});

const isServer = typeof window === "undefined";

const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      if (!isServer) {
        const token = store.getState().root.auth?.token;
        if (token) {
          config.headers["authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};

HTTP_CLIENT.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err?.response?.status === 401) {
      const { auth } = store.getState().root;
      if (auth?.token) {
        store.dispatch(resetAuthReducer());
        if (document) {
          document.cookie.split(";").forEach(function (c) {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(
                /=.*/,
                "=;expires=" + new Date().toUTCString() + ";path=/"
              );
          });
        }
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);

export const initialConfig = () => {
  setupAxios();
};

initialConfig();
