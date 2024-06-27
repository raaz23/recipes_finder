import express from "express";
import {
  userSignUp,
  userSignIn,
  profile,
} from "../controllers/userController.js";
import verifyJWT from "../utils/verifyJWT.js";

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userSignIn);
router.get("/user", verifyJWT, profile);

export default router;
