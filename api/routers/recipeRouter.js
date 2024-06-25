import express from "express";
import { createRecipe, deleteRecipeById, getAllRecipes, getAllSavedRecipe, getRecipeById, savedRecipeById } from "../controllers/recipeController.js";
import verifyJWT from "../utils/verifyJWT.js";
const router=express.Router();

router.post("/add", verifyJWT, createRecipe);
router.get("/all", getAllRecipes);
router.get("/getSavedRecipe", verifyJWT, getAllSavedRecipe);
router.get("/:id", getRecipeById);
router.delete("/:id", verifyJWT,deleteRecipeById);
router.post("/:id",verifyJWT, savedRecipeById);



export default router;