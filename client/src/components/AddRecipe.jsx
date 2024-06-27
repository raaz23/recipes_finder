import axios from "axios";
import { useState } from "react";
import toastify from "../toast/toastify";

const AddRecipe = () => {
  const [formData, setFromData] = useState({
    title: "",
    inst: "",
    qty1: "",
    qty2: "",
    qty3: "",
    qty4: "",
    ing1: "",
    ing2: "",
    ing3: "",
    ing4: "",
    imgUrl: "",
  });

  const handleChange = (e) => {
     setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

const handleSubmit=async ()=>{
try{
  const response=  await  axios.post("http://localhost:3000/api/addRecipe",{
        formData
  },{
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true 
  }
) 
if(response){
  console.log(response.data);
  toastify("add recipe successfully");
  toastify(response.data.message);
}
}
catch(err){
  console.log(err);
  toastify("error in adding recipe");
}
}

  return (
    <div
      className="mx-auto my-6 p-5"
      style={{
        maxWidth: "42rem",
        border: "2px solid yellow",
        borderRadius: "10px",
      }}
    >
      <h1 className="text-3xl sm:xl text-center mt-2 underline p-8">
        Add Recipe
      </h1>

      <div className="w-full h-1 bg-white mt-1 mb-2"></div>
      <form  onSubmit={handleSubmit}
        className="p-3"
        style={{
          overflowY: "auto",
          maxHeight: "560px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <div className="mb-3 mt-8">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            required
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inst" className="form-label">
            Instructions
          </label>
          <input
            type="text"
            className="form-control"
            id="inst"
            name="inst"
            required
            onChange={handleChange}
            value={formData.inst}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qty1" className="form-label">
            Quantity 1
          </label>
          <input
            type="text"
            className="form-control"
            id="qty1"
            name="qty1"
            required
            onChange={handleChange}
            value={formData.qty1}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qty1" className="form-label">
            Quantity 2
          </label>
          <input
            type="text"
            className="form-control"
            id="qty2"
            name="qty2"
            required
            onChange={handleChange}
            value={formData.qty2}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qty3" className="form-label">
            Quantity 3
          </label>
          <input
            type="text"
            className="form-control"
            id="qty3"
            name="qty3"
            required
            onChange={handleChange}
            value={formData.qty3}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qty4" className="form-label">
            Quantity 4
          </label>
          <input
            type="text"
            className="form-control"
            id="qty4"
            name="qty4"
            required
            onChange={handleChange}
            value={formData.qty4}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ing1" className="form-label">
            Ingredient 1
          </label>
          <input
            type="text"
            className="form-control"
            id="ing1"
            name="ing1"
            required
            onChange={handleChange}
            value={formData.ing1}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ing2" className="form-label">
            Ingredient 2
          </label>
          <input
            type="text"
            className="form-control"
            id="ing2"
            name="ing2"
            required
            onChange={handleChange}
            value={formData.ing2}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ing3" className="form-label">
            Ingredient 3
          </label>
          <input
            type="text"
            className="form-control"
            id="ing3"
            name="ing3"
            onChange={handleChange}
            required
            value={formData.ing3}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ing4" className="form-label">
            Ingredient 4
          </label>
          <input
            type="text"
            className="form-control"
            id="ing4"
            name="ing4"
            onChange={handleChange}
            required
            value={formData.ing4}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imgUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imgUrl"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange} required
          />
        </div>

        <div className="w-full h-12 flex justify-center items-center mt-5">
          <button
            type="submit"
            className="border-3 border-yellow-300 text-white px-20 py-3 rounded hover:bg-yellow-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
