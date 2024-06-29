import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipe, setRecipe] = useState([]);


  useEffect(() => {
    handleRecipe();
  }, []);

  const handleRecipe = async () => {
    const response = await axios.get("http://localhost:3000/api/all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //const data =JSON.stringify(response.data);
    console.log(response.data.data);
    setRecipe(response.data.data);
  };

  const user = useSelector((state) => {
    return state.login.loginUserData;
  });




  return (
    <section className="py-14 w-100 ">
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="w-full">
        <div className="text-white text-3xl font-semibold sm:text-4xl">
          {user !== null ? (
            <h1 className=" text-center">Welcome {user.name} 🙏🏻</h1>
          ) : (
            <h1 className="text-center">
              Welcome to Recipe Finder{" "}
              <strong className="text-3xl text-red-400">(GUEST)</strong>
            </h1>
          )}
        </div>
        <br />
        <p className="text-white text-center mt-3">
          This is the best place to find new and amazing recipes for cooking food. Hope you like it more! <br />
          <br /> Thank you so much for spending time here.
        </p>
        <br />
        <div className="w-full h-1 bg-white"></div>
      </div>
      <div className="mt-12 ">
        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {recipe.map((item, index) => (
            <li key={index}>
              <article className="group">
                <img
                  alt={item.title}
                  src={item.url}
                  className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />
                <div className="p-4">
                  <Link to="#">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {item.inst}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
  );
};

export default Home;
