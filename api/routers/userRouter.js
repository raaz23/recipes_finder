import express from "express";
import {
  userSignUp,
  userSignIn,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import verifyJWT from "../utils/verifyJWT.js";

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userSignIn);
router.post("/update/:id",verifyJWT,updateUser);
router.delete('/delete/:id', verifyJWT, deleteUser);


export default router;
