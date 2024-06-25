import express from "express";
import {userSignUp,userSignIn, profile} from "../controllers/userController.js";
import verifyJWT from "../utils/verifyJWT.js";

const router=express.Router();

router.post("/signup", userSignUp);
router.post("/signin",verifyJWT, userSignIn);
router.get("/user",verifyJWT,profile)


export default router;