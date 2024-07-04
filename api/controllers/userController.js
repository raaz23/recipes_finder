import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
// userSignUp controller
export const userSignUp = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Validate input
    if (!name || !password || !email || name==="" || password==="" || email==="") {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Default photo URL
    const photo = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 12);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      photo,
    });
    await newUser.save();

    // Generate JWT token 
    const token = jwt.sign({ id: newUser._id }, "MYNAMEISRAJUYADAV20SCSE1010854", {
      expiresIn: "1d",
    });

    // Set cookie in response
     res.cookie("access_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "None",
      secure: true
    }).status(201).json({ message: "Successfully created user", newUser});

  } catch (err) {
    // Handle errors
    //console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// userSignIn controller
export const userSignIn = async (req, res) => {
  //console.log(res.body)

  try {
    const user = await userModel.findOne({ email:req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id },"MYNAMEISRAJUYADAV20SCSE1010854", {
      expiresIn: "1d",
    });
    
    const { password, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true,httpOnly: true,
        path: "/",
        sameSite: "None", 
        secure: true })
      .status(200)
      .json({ message: "Successfully logged in", data:rest });
  } catch (err) {
    //console.error(err);
    res.status(500).json({message: err.message });
  }
};
export const updateUser = async (req, res, next) => {

  try {
    
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized! Change your own profile." });
    }


    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 12);
    }

    
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name || user.name,
          password: req.body.password || user.password,
          photo: req.body.photo || user.photo,
        },
      },
      { new: true } 
    );
    
    const { password, ...rest } = updateUser._doc;
   // console.log(rest);
    return res.status(201).json({ message: "Successfully updated user account", data: rest });
    
  } catch (error) {
  
    return res.status(500).json({ message: "Failed to update user account" });
  }
};


export const deleteUser = async (req, res, next) => {
  //console.log(req.user.id, req.params.id);
  if (req.user.id !== req.params.id)
    return res
      .status(403)
      .json({ message: "Change your own profile password: invalid" });

  try {

    await userModel.findByIdAndDelete(req.params.id);

    
    return res.status(200).json({message:"Successfully deleted Account"});
  } catch (error) {
    next(error);
    return res.status(402).json({ message: "Error in deleting Account" });
  }
};
