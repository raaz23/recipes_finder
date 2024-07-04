import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import cookie from "cookiejs";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.login.loginUserData);

  const handleLogOut = () => {
    cookie.remove("access_token");
    localStorage.removeItem("persist:root");
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-dark p-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-white">Recipe Finder</h1>
        </div>
        <button
          className="text-white sm:hidden"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
        <div className="hidden sm:flex items-center space-x-4">
          <NavLink to="/" className="btn btn-outline-secondary">
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink to="/register" className="btn btn-outline-info">
                Register
              </NavLink>
              <NavLink to="/login" className="btn btn-outline-info">
                Login
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink to="/add" className="btn btn-outline-warning">
                Add
              </NavLink>
              <NavLink to="/saved" className="btn btn-outline-success">
                Saved Recipes
              </NavLink>
              <NavLink to="/profile" className="btn btn-outline-primary">
                Profile
              </NavLink>
              <button
                className="btn btn-outline-danger hover:bg-red-900"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col sm:hidden space-y-2 mt-2">
          <NavLink to="/" className="btn btn-outline-secondary">
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink to="/register" className="btn btn-outline-info">
                Register
              </NavLink>
              <NavLink to="/login" className="btn btn-outline-info">
                Login
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink to="/add" className="btn btn-outline-warning">
                Add
              </NavLink>
              <NavLink to="/saved" className="btn btn-outline-success">
                Saved Recipes
              </NavLink>
              <NavLink to="/profile" className="btn btn-outline-primary">
                Profile
              </NavLink>
              <button
                className="btn btn-outline-danger hover:bg-red-900"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
