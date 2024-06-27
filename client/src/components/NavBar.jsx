import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Cookies from "js-cookie";

const NavBar = () => {
  const user = useSelector((state) => state.login.loginUserData);
  const handleLogOut = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("persist:root");
    window.location.href = "/";
  };

  return (
    <div className="nav bg-dark flex justify-between p-2">
      <div>
        <h1 className="text-3xl text-white">Recipe Finder</h1>
      </div>
      <div className="right">
        <NavLink to="/" className="btn btn-outline-secondary mx-2">
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink to="/register" className="btn btn-outline-info mx-2">
              Register
            </NavLink>

            <NavLink to="/login" className="btn btn-outline-info mx-2">
              Login
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/saved" className="btn btn-outline-success mx-2">
              Saved Recipes
            </NavLink>

            <Link
              to="/add"
              className="btn mx-2 text-yellow-500 hover:bg-yellow-500 hover:text-white border-2 border-yellow-300"
            >
              Add
            </Link>

            <NavLink to="/profile" className="btn btn-outline-primary mx-2">
              Profile
            </NavLink>

            <NavLink
              className="btn btn-outline-danger mx-2"
              onClick={handleLogOut}
            >
              Logout
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;