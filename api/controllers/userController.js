import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
// userSignUp controller
export const userSignUp = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Validate input
    if (!name || !password || !email) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Default photo URL
    const photo = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";

    // Hash the password
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

    // Set cookie and send response
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ message: "Successfully created user",  newUser });
  } catch (err) {
   // console.error(err);
    res.status(500).json({ msg: "Internal server error", message: err.message });
  }
};

// userSignIn controller
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

    const token = jwt.sign({ id: user._id },"MYNAMEISRAJUYADAV20SCSE1010854", {
      expiresIn: "1d",
    });

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Successfully logged in", data:user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error", message: err.message });
  }
};
export const updateUser = async (req, res, next) => {
  const {name, photo}=req.body;
  //console.log(name, photo);
  try {
    // Check if the user is authorized to update
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized! Change your own profile." });
    }

    // Fetch the user from the database
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided in request body
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 12);
    }

    // Update user in the database
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: name || user.name, 
          password: req.body.password || user.password, 
          photo: photo || user.photo, 
        },
      },
    );

    const { password, ...rest } = updateUser._doc;
   // console.log(updateUser);

    return res.status(201).json({ message: "Successfully updated user account", data: rest });
  } catch (error) {
   // console.error("Error updating user:", error);
    return res.status(500).json({ message: "Failed to update user account" });
  }
};


export const deleteUser = async (req, res, next) => {
  console.log(req.user.id, req.params.id);
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
