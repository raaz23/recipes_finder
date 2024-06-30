import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRef, useState, useEffect } from "react";
import toastify from "../toast/toastify";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import {storage} from "../utils/firebase.js";

const AddRecipe = () => {
  const navigate = useNavigate();
  const fileRef = useRef();
  
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (Image) => {
    const fileName = new Date().getTime() + Image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask =  uploadBytesResumable(storageRef, Image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
      },
      (error) => {
        setImageError(error.message);
      },
     async () => {
       await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, imgUrl: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data) {
        toastify(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
        setFormData({
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
      }
    } catch (err) {
     // console.log(err);
      toastify("Error in adding recipe");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div
      className="mx-auto my-6 p-5"
      style={{
        maxWidth: "42rem",
        border: "2px solid yellow",
        borderRadius: "10px",
      }}
    >
      <ToastContainer />
      <h1 className="text-3xl sm:xl text-center mt-2 underline p-8">Add Recipe</h1>
      <div className="w-full h-1 bg-white mt-1 mb-2"></div>
      <form
        onSubmit={handleSubmit}
        className="p-3"
        style={{
          overflowY: "auto",
          maxHeight: "560px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="mb-3 mt-8">
          <label htmlFor="title" className="form-label">Title</label>
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
          <label htmlFor="inst" className="form-label">Instructions</label>
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
          <label htmlFor="qty1" className="form-label">Quantity 1</label>
          <input
            type="text"
            className="form-control"
            id="qty1"
            name="qty1"
          
            onChange={handleChange}
            value={formData.qty1}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qty2" className="form-label">Quantity 2</label>
          <input
            type="text"
            className="form-control"
            id="qty2"
            name="qty2"
          
            onChange={handleChange}
            value={formData.qty2}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qty3" className="form-label">Quantity 3</label>
          <input
            type="text"
            className="form-control"
            id="qty3"
            name="qty3"
          
            onChange={handleChange}
            value={formData.qty3}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qty4" className="form-label">Quantity 4</label>
          <input
            type="text"
            className="form-control"
            id="qty4"
            name="qty4"
          
            onChange={handleChange}
            value={formData.qty4}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ing1" className="form-label">Ingredient 1</label>
          <input
            type="text"
            className="form-control"
            id="ing1"
            name="ing1"
         
            onChange={handleChange}
            value={formData.ing1}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ing2" className="form-label">Ingredient 2</label>
          <input
            type="text"
            className="form-control"
            id="ing2"
            name="ing2"
           
            onChange={handleChange}
            value={formData.ing2}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ing3" className="form-label">Ingredient 3</label>
          <input
            type="text"
            className="form-control"
            id="ing3"
            name="ing3"
        
            onChange={handleChange}
            value={formData.ing3}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ing4" className="form-label">Ingredient 4</label>
          <input
            type="text"
            className="form-control"
            id="ing4"
            name="ing4"
            
            onChange={handleChange}
            value={formData.ing4}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imgUrl" className="form-label">Image URL</label>
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            
          />
          <img
            src={formData.imgUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtdKXRuYUkQsxws-_KNfdKLn1jRehMKaXSmw&s" }
            alt="recipeImage"
            required
            className="h-52 w-52 rounded-sm object-cover flex self-center cursor-pointer items-center"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm text-red-700 text-center font-bold">
            {imageError ? (
              <span className="text-red-700">
                {"Error occurred while uploading image: " + imageError}
              </span>
            ) : progress > 0 && progress < 100 ? (
              <span className="text-white">
                {"Image uploading progress: " + progress + "%"}
              </span>
            ) : progress === 100 ? (
              <span className="text-rose-800">{"Image uploaded successfully"}</span>
            ) : null}
          </p>
        </div>

        <div className="w-full h-12 flex justify-center items-center mt-5">
          <button
            type="submit"
            className="border-3 border-yellow-300 text-white px-20 py-3 rounded hover:bg-yellow-600"
          >
           {progress>0 && progress<100 ?"Loading":"Add"} 
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
