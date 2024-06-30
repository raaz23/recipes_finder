import express from "express";
import { createRecipe, deleteRecipeById, getAllRecipes, getAllSavedRecipe, getRecipeById, savedRecipeById } from "../controllers/recipeController.js";
import verifyJWT from "../utils/verifyJWT.js";
const router=express.Router();

router.post("/add", createRecipe);
router.get("/all", getAllRecipes);
router.get("/getSavedRecipe", getAllSavedRecipe);
router.get("/:id", getRecipeById);
router.delete("/deleteSavedRecipe/:id", deleteRecipeById);
router.post("/save/:id",savedRecipeById);



export default router;