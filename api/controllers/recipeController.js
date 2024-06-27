import { decode } from "jsonwebtoken";
import recipeModel from "../models/receipyModel.js";
import savedRecipeModel from "../models/savedRecipeModel.js";

// Create a new recipe
export const createRecipe = async (req, res) => {
  console.log(req.params.id)
  if(!req.user.id) {return res.status(402).json({message:"you are not authenticate to create ! please login first"}) }
  const {
    title,
    inst,
    qty1,
    qty2,
    qty3,
    qty4,
    ing1,
    ing2,
    ing3,
    ing4,
    imgUrl,
     user,
  } = req.body;

  try {
    const newRecipe = new recipeModel({
      title,
      inst,
      qty1,
      qty2,
      qty3,
      qty4,
      ing1,
      ing2,
      ing3,
      ing4,
      imgUrl,
      user
    });
    await newRecipe.save();
    res
      .status(201)
      .json({
        data: newRecipe,
        message: `created new recipe ${newRecipe.title}`,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    res.status(200).json({ data: recipes, message: "get all recipes" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res
      .status(200)
      .json({ data: recipe, message: `get recipe of ${recipe.title}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete recipe by ID
export const deleteRecipeById = async (req, res) => {
  const id = req.params.id;

  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }

  try {
    const deletedRecipe = await recipeModel.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    res
      .status(200)
      .json({ message: `Recipe deleted successfully ${deletedRecipe.title}}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const savedRecipeById = async (req, res) => {
  const id = req.params.id;

  let recipe = await savedRecipeModel.findOne({ recipe: id });

  if (recipe) return res.json({ message: "recipe already saved" });

  recipe = await savedRecipeModel.create({ recipe: id });

  res.json({ message: `Recipe saved Successfully` });
};

export const getAllSavedRecipe = async (req, res) => {
  const recipe = await savedRecipeModel.find();
  if (!recipe)
    res.status(402).json({ status: 0, message: "not found any recipe" });
  res
    .status(201)
    .json({ status: 1, message: "successfully fetched saved recipe", recipe });
};
