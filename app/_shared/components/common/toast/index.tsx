"use client";
import { Icons } from "assets";
import classNames from "classnames";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastMessage = (type: String, msg: String) => {
  if (type === "success") {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      hideProgressBar: false,
      theme: "colored",
    });
  } else if (type === "info") {
    toast(msg, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      hideProgressBar: false,
      theme: "light",
      icon: <Icons.Rocket />,
    });
  } else {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      hideProgressBar: false,
      theme: "colored",
    });
  }
};
export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName={classNames("max-zIndex")}
    />
  );
}
