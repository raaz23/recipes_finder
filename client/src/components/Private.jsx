import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Private = () => {
  const user = useSelector((state) => {
    return state.login.loginUserData;
  });

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default Private;
