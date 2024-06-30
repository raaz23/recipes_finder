import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import toastify from "../toast/toastify";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const user = useSelector((state) => state.login.loginUserData);
 // console.log(user);
  const navigate=useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/all");
      setRecipes(response.data.data);
    } catch (error) {
     // console.error("Error fetching recipes:", error);
    }
  };

  const handleViewRecipe = async (recipeId) => {
 
    //console.log(`View recipe with ID: ${recipeId}`);

    try {
      
      navigate(`detail/${recipeId}`)
    } catch (error) {
      toastify("Error fetching recipes")
      //console.error("Error fetching recipes:", error);
    }
  };


  const handleSaveRecipe = async (recipeId) => {
    console.log(recipeId);
    try {
      const response=await axios.post(`http://localhost:3000/api/save/${recipeId}`,
        {
          withCredentials: true,
        }
     
      );
      toastify(response.data.message);
    } catch (error) {
      toastify(error.message);
      //console.error("Error in saved recipes:", error);
    }
  }

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-white text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Welcome {user ? user.name : "Guest"} 🙏🏻
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            This is the best place to find new and amazing recipes for cooking food. We hope you enjoy your time here!
          </p>
        </div>
        <div className="h-1 w-full bg-white mt-4 mb-12"></div>
        
        <ToastContainer/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <div key={index} className="group block rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
              
                <img
                  src={recipe.imgUrl}
                  alt={recipe.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800 group-hover:text-yellow-600 truncate text-center">
                    {recipe.title}
                  </h3>
                  <p className="mt-2 text-base sm:text-lg text-gray-600 line-clamp-3 text-center">
                    {recipe.inst}
                  </p>
                </div>
              
              <div className="flex justify-between items-center p-4">
             <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
                  onClick={() => handleViewRecipe(recipe._id)}
                >
                  View
                </button>
              
               <button
                 className={user ? "bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300" : "bg-gray-500 text-white py-2 px-4 rounded-md"}
                 onClick={() => handleSaveRecipe(recipe._id)}
                 disabled={!user}
                >
                  {!user?"login to saved recipe":"Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
