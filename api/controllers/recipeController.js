import recipeModel from "../models/receipyModel.js";
import savedRecipeModel from "../models/savedRecipeModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

// Create a new recipe
export const createRecipe = async (req, res) => {
 // console.log(req.user.id)
  //if(!req.user.id) {return res.status(402).json({message:"you are not authenticate to create ! please login first"}) }
  
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
  
  } = req.body;

  try {
    
    const newRecipe = new recipeModel({
      title,
      inst,
      qty1:qty1 || "",
      qty2:qty2 || "",
      qty3:qty3 || "",
      qty4:qty4 || "",
      ing1:ing1 || "",
      ing2:ing2 || "",
      ing3:ing3 || "",
      ing4:ing4 || "",
      imgUrl,
  
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
   // console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  const id = req.params.id;
  //console.log(id);

  try {
    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res
      .status(200)
      .json({ data: recipe, message: `get recipe of ${recipe.title}` });
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete recipe by ID
export const deleteRecipeById = async (req, res) => {
 
  try {
    const deletedRecipe = await savedRecipeModel.findOneAndDelete({saveRecipeId:req.params.id});
    if (!deletedRecipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    res
      .status(200)
      .json({ message: "Recipe deleted successfully"});
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const savedRecipeById = async (req, res) => {

  try {
    // Find the recipe
    const recipe = await recipeModel.findById(req.params.id);
    console.log(recipe);

    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the recipe is already saved
    const existingSavedRecipe = await savedRecipeModel.findOne({ saveRecipeId: req.params.id});
    if (existingSavedRecipe) {
      return res.json({ message: "Recipe already saved" });
    }

    // Save the recipe
    const recipeSaved = new savedRecipeModel({ saveRecipeId: req.params.id });
    await recipeSaved.save();

    res.json({ message: "Recipe saved successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getAllSavedRecipe = async (req, res) => {
  const recipe = await savedRecipeModel.find();
  if (!recipe)
    res.status(402).json({ status: 0, message: "not found any recipe" });

  const allRecipe=await Promise.all(recipe.map(async(each)=>{
    const recipe=await recipeModel.findById(each.saveRecipeId);
    return recipe;
  }));

  res
    .status(201)
    .json({ status: 1, message: "successfully fetched saved recipe", data:allRecipe });
};
