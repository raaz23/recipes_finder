import express from "express";
import { createRecipe, deleteRecipeById, getAllRecipes, getRecipeById } from "../controllers/recipeController.js";
import verifyJWT from "../utils/verifyJWT.js";
const router=express.Router();

router.post("/add", createRecipe);
router.get("/all", getAllRecipes);
router.get("/:id", getRecipeById);
router.delete("/:id", verifyJWT,deleteRecipeById);
router


export default router;