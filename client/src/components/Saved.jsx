import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toastify from "../toast/toastify";
import { ToastContainer } from "react-toastify";
import config from "../../config";
import { useSelector } from "react-redux";

const SavedRecipes = () => {
  const user = useSelector((state) => state.login.loginUserData);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/getSavedRecipe/${user._id}`, {
        withCredentials: true,
      });
    //  console.log(response.data.data);
      setSavedRecipes(response.data.data);
      
     
    } catch (error) {
      //console.error("Error fetching saved recipes:", error);
    }
  };

  const handleViewRecipe = (recipeId) => {
    //console.log(`View recipe with ID: ${recipeId}`);
    try {
      navigate(`/detail/${recipeId}`);
    } catch (error) {
      //console.error("Error fetching recipes:", error);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    //console.log(`Delete recipe with ID: ${recipeId}`);
    try {
      const response=await axios.post(`${config.BASE_URL}/api/deleteSavedRecipe/${user._id}/${recipeId}`,{}, {
        withCredentials: true,
      });
      toastify(response.data.message);
      setSavedRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe._id !== recipeId));
       
    } catch (error) {
      //console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-600 py-10"> <ToastContainer/>
      <div className="max-w-screen-xl mx-auto px-4">
<h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Saved Recipes</h1>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
        
          {savedRecipes && savedRecipes.map((savedRecipe, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
              <img
                src={savedRecipe.imgUrl || ""}
                alt={savedRecipe.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 w-full text-center">
                <h3 className="text-2xl font-semibold text-gray-600 mb-3">{savedRecipe.title}</h3>
                <p className="text-gray-600 mb-4">{savedRecipe.inst}</p>
                <div className="flex justify-around">
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => handleViewRecipe(savedRecipe._id)}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                    onClick={() => handleDeleteRecipe(savedRecipe._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
