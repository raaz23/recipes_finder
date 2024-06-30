import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Saved from "./components/Saved";
import Profile from "./components/Profile";
import AddRecipe from "./components/AddRecipe";
import Private from "./components/Private";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Private />}>
          <Route path="/saved" element={<Saved />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:id" element={<Detail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
