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
import toastify from "../toast/toastify.js";

const SignUp = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch(loginRequest());

    try {
      const response = await axios.post(
        `${window.location.origin}/api/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toastify("Register Successfully !");
      dispatch(loginSuccess());
      dispatch(loginUserData(response.data.newUser));
      setTimeout(()=>{navigate("/");},1500) ;

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      dispatch(loginFailure(err.message));
      toastify("Internal server error !");
    }
  };

  return (
    <div
      className="mx-auto my-20 p-8"
      style={{
        maxWidth: "42rem",
        border: "2px solid yellow",
        borderRadius: "10px",
      }}
    >
      {" "}
      <ToastContainer />
      <h1 className="text-3xl sm:xl text-center mt-2 underline">Register</h1>
      <div className="w-full h-1 bg-white mt-3"></div>
      <form className="p-3" onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            aria-describedby="name of the user"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            aria-describedby="email of the user"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="w-full h-12 flex justify-center items-center">
          <button
            type="submit"
            className="border-3 border-yellow-300 text-white px-20 py-3 rounded hover:bg-yellow-600"
          >
            Button
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
