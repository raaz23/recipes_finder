import express from "express";
import { createRecipe, deleteRecipeById, getAllRecipes, getAllSavedRecipe, getRecipeById, savedRecipeById } from "../controllers/recipeController.js";
import verifyJWT from "../utils/verifyJWT.js";
const router=express.Router();

router.post("/add",createRecipe);
router.get("/all", getAllRecipes);
router.get("/getSavedRecipe/:id",verifyJWT,getAllSavedRecipe);
router.get("/:id", getRecipeById);
router.post("/deleteSavedRecipe/:user/:recipeId",verifyJWT, deleteRecipeById);
router.post("/save/:id1/:id2", verifyJWT, savedRecipeById);

export default router;