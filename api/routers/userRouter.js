import express from "express";
import {userSignUp,userSignIn} from "../controllers/userController.js";
import verifyJWT from "../utils/verifyJWT.js";
const router=express.Router();

router.post("/signup", userSignUp);
router.post("/signin",verifyJWT, userSignIn);


export default router;