import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toastify from '../toast/toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    handleViewRecipe(id);
  }, [id]);

  const handleViewRecipe = async (recipeId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${recipeId}`);
      setData(response.data.data);
    } catch (error) {
      toastify("Error fetching recipes");
      //console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-5">
      <ToastContainer />
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden my-5">
        <div className="flex flex-col md:flex-row p-5" style={{ width: "80%", margin: "auto" }}>
          <div className="w-full md:w-1/2 mr-6">
            <div className="w-full h-64 md:h-80">
              <img
                src={data.imgUrl}
                className="object-cover w-full h-full rounded-lg"
                alt={data.title}
              />
            </div>
            <h3 className="text-2xl font-semibold text-center mt-4 mb-2">{data.title}</h3>
            <p className="text-center text-lg text-gray-700 mb-4">{data.inst}</p>
          </div>
          <div className="w-full md:w-1/2 md:pl-5 ml-6 mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-2">ingredient 1 -{data.ing1} : quantity - {data.qty1}</h4>
            <h4 className="text-lg font-medium text-gray-800 mb-2">ingredient 2 -{data.ing2} : quantity - {data.qty2}</h4>
            <h4 className="text-lg font-medium text-gray-800 mb-2">ingredient 3 -{data.ing3} : quantity - {data.qty3}</h4>
            <h4 className="text-lg font-medium text-gray-800 mb-2">ingredient 4 -{data.ing4} : quantity - {data.qty4}</h4>
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
