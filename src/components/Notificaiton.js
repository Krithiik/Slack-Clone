import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification({
  notification,
  show,
  setShow,
  setNotification,
}) {
  if (show) {
    toast.info(<Display />, { toastId: "notification" });
    setTimeout(() => {
      setShow(false);
      setNotification({
        title: "",
        body: "",
        img: "",
      });
    }, 5500);
  }
  function Display() {
    return (
      <div>
        <h4>{notification.title}</h4>
        <p>{notification.body}</p>
      </div>
    );
  }

  return (
    <ToastContainer
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
  );
}
