import { url } from "inspector";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo:{
    type:"String",
    default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
},
},{timestamps: true});
const userModel = new mongoose.model("Users", userSchema);
export default userModel;
