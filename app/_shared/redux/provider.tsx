"use client";
import { store } from "redux/store";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Next13ProgressBar } from "next13-progressbar";
import "react-toastify/dist/ReactToastify.css";

const CustomProvider = ({ children }: any) => {
  return (
    <Provider store={store}>
      <Next13ProgressBar
        height="4px"
        color="#ED1C24"
        options={{ showSpinner: false }}
        showOnShallow
      />
      <CookiesProvider>{children}</CookiesProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
};

export default CustomProvider;
