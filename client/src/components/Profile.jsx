import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase.js";
import {
  updateFailure,
  updateRequest,
  updateSuccess,
} from "../redux/action/action";
import axios from "axios";
import toastify from "../toast/toastify.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const currUser = useSelector((state) => state.login.loginUserData);
 // console.log(currUser);
  const fileRef = useRef();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: currUser.name,
    password: "",
    photo: currUser.photo,
  });
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = (Image) => {
    const fileName = new Date().getTime() + Image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, Image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
      },
      (error) => {
        setImageError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, photo: downloadURL }));
        });
      }
    );
  };


  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      dispatch(updateRequest());

      const res = await axios.post(
        `http://localhost:3000/api/update/${currUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
        
      );

      if (res.data) {
        toastify(res.data.message);
        dispatch(updateSuccess(res.data.data));
      } else {
        toastify("Update failed");
        dispatch(updateFailure(new Error("Update failed")));
      }
    } catch (error) {
      toastify("Error in updating account");
      dispatch(updateFailure(error));
    }
  };

  const handleDelete = async () => {
   // console.log(currUser._id);
    const id=currUser._id;
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/delete/${id}`,
        {
          withCredentials: true,
        }
      );
  
      if (res.data) {
        toastify(res.data.message);
        dispatch(updateSuccess(null));
      } else {
        toastify('Deletion failed');
        dispatch(updateFailure(new Error('Deletion failed')));
      }
    } catch (error) {
      toastify("Can't delete this user account. Please contact the support team!");
      dispatch(updateFailure(error));
    }
  };

  if (!currUser) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-3 max-w-lg mx-auto flex flex-col bg-slate-500 mt-7 gap-3">
      <h1 className="text-3xl text-center font-semibold my-2 border-b-2 border-gray-300">
        Profile
      </h1>
      <ToastContainer />
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => setImage(e.currentTarget.files[0])}
      />

      <img
        src={formData.photo || currUser.data.photo || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
        alt="profilePicture"
        className="h-52 w-52 rounded-full object-cover flex self-center cursor-pointer"
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
      <form className="flex flex-col gap-3 p-3" onSubmit={handleSubmit}>
      <input
          type="text"
          value={formData.name}
          name="name"
          placeholder={currUser.name}
          className="text-center text-black"
          onChange={handleChanges}
        />
        <input
          type="email"
          value={currUser.email}
          className="text-center text-black"
         
          readOnly
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          placeholder="Update your password"
          className="text-center text-black"
          onChange={handleChanges}
        />
        <button type="submit" className="p-2 bg-sky-800">
        {progress>0 && progress<100 ?"Loading":"Update"} 
        </button>
      </form>

      <div className="flex justify-between">
        <button
          type="button"
          className="text-red-900 cursor-pointer hover:scale-110 duration-300 ml-5"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
