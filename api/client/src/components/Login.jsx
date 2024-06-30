import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  loginFailure,
  loginSuccess,
  loginUserData,
  loginRequest,
} from "../redux/action/action.js";
import { useNavigate } from "react-router-dom";
import toastify from "../toast/toastify.js"
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(loginRequest());

    try {
      const response = await axios.post(
        `${window.location.origin}/api/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toastify(response.data.message);
      dispatch(loginSuccess());
      //console.log(response.data.data);
      dispatch(loginUserData(response.data.data));
     setTimeout(()=>{navigate("/");},1500) ;
      setEmail("");
      setPassword("");
    } catch (err) {
      dispatch(loginFailure(err.message));
      toastify("Invalid email or password !");
    }
  };

  return (
    <>
      <div
        className="mx-auto my-20"
        style={{
          maxWidth: "42rem",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <ToastContainer />

        <h1 className="text-3xl sm:text-xl text-center mt-2 underline p-8">
          Login
        </h1>
        <div className="w-full h-1 bg-white mt-3"></div>
        <form className="p-3" onSubmit={handleLogin}>
          <div className="mb-3 mt-8">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
          </div>

          <div className="mb-3 form-check"></div>
          <div className="w-full h-12 flex justify-center items-center">
            <button
              type="submit"
              className="border-3 border-yellow-300 text-white px-20 py-3 rounded hover:bg-yellow-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
