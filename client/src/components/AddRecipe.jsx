import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRef, useState } from "react";
import toastify from "../toast/toastify";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

const AddRecipe = () => {
  const inputImage=useRef('');
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

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
        console.log(response.data);
        setTimeout(()=>{
          navigate("/");
        },1500)
        toastify(response.data.message);
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
      console.log(err);
      toastify("Error in adding recipe");
    }
  };


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setImageURL(url);
    }
  };

  return (
    
    <div
      className="mx-auto my-6 p-5 "
      style={{
        maxWidth: "42rem",
        border: "2px solid yellow",
        borderRadius: "10px",
      }}
    > <ToastContainer/>
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
          "&::-webkit-scrollbar": {
            display: "none",
          },
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
            value={formData.ing4}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imgUrl" className="form-label">Image URL</label>
          <input
            type="file"
            className="form-control"
            id="imgUrl"
            name="imgUrl"
            value={image}
            onChange={handleImageChange}
            style={{display:"hidden"}}
          />
          <img src="" alt="" ref={inputRef} />
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
