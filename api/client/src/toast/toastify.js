import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastify = (message) => {
  toast(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export default toastify;
