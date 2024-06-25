import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/error.js";
export const userSignUp = async (req, res) => {
    const { name, password, email } = req.body;
    console.log(req.body);
  
    try {
      if (!name || !password || !email) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters long" });
      }
  
      const valid = await userModel.findOne({ email });
  
      if (valid) {
        return res.status(400).json({ msg: "User already exists" });
      }
  
      const hashPass = bcrypt.hashSync(password, 12);
  
      const user = new userModel({
        name,
        email,
        password: hashPass,
      });
      await user.save();
  
      const token = jwt.sign({ id: user._id }, "receiyfoodmernStack12345", { expiresIn: "1d" });
      res.cookie("access_token", token, { httpOnly: true}).status(201).json({ message:"successfully data created", data: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    }
  };

export const userSignIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      }
  
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, "receiyfoodmernStack12345", { expiresIn: "1d" });
      res.cookie("access_token", token, { httpOnly: true}).status(201).json({message:"successFully login", data: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    }
}
export const profile=async (req,res,next)=>{
  const user_ka_id=req.user.id;
    try{
    const userProfile=await userModel.findById(user_ka_id);

     res.status(201).json({user:userProfile});
    }
    catch(err){
      res.json({message:err.message});
    }
}


