import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toastify from '../toast/toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import config from '../../config';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    handleViewRecipe(id);
  }, [id]);

  const handleViewRecipe = async (recipeId) => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/${recipeId}`);
      setData(response.data.data);
    } catch (error) {
      toastify("Error fetching recipes");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-5">
      <ToastContainer />
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden my-5">
        <div className="flex flex-col md:flex-row p-5" style={{ width: "100%", margin: "auto" }}>
          <div className="w-full flex flex-col items-center md:items-start">
            <div className="w-full h-64 md:h-80">
              <img
                src={data.imgUrl}
                className="object-cover w-full h-full rounded-lg"
                alt={data.title}
              />
            </div>
            <h3 className="text-sm sm:w-full md:text-2xl font-semibold text-center md:text-left text-yellow-600 mt-4 mb-2">
              <strong>{data.title}</strong>
            </h3>
            <p className="text-sm text-center md:text-left md:text-md text-gray-700 mb-4">{data.inst}</p>
          </div>
          <div className=" w-full md:w-1/2 md:pl-5 md:ml-6 mt-6 md:mt-0">
            <h4 className="text-sm md:text-md font-medium text-gray-800 mb-2"><strong>Ingredient 2:</strong> {data.ing2}</h4>
            <h4 className="text-sm md:text-md font-medium text-gray-800 mb-2"><strong>Ingredient 1:</strong> {data.ing1}</h4>
            <h4 className="text-sm md:text-md font-medium text-gray-800 mb-2"><strong>Ingredient 3:</strong> {data.ing3}</h4>
            <h4 className="text-sm md:text-md font-medium text-gray-800 mb-2"><strong>Ingredient 4:</strong> {data.ing4}</h4>
            <h4 className="text-sm md:text-md font-medium text-gray-800 mb-2"><strong>Ingredient 5:</strong> {data.qty1}</h4>
            <h4 className="text-sm md:text-md font-medium text-gray-800 mb-2"><strong>Ingredient 6:</strong> {data.qty2}</h4>
            <h4 className="text-sm md:text-md font-medium text-gray-800 mb-2"><strong>Ingredient 7:</strong> {data.qty3}</h4>
            <h4 className="text-sm md:text-md font-medium text-gray-800 mb-2"><strong>Ingredient 8:</strong> {data.qty4}</h4>
          </div>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Detail;
