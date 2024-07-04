import recipeModel from "../models/receipyModel.js";
import savedRecipeModel from "../models/savedRecipeModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

// Create a new recipe
export const createRecipe = async (req, res) => {
  
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
    if(req.user.id!==req.params.user) return res.status(404).json({message:"you are not authorized to delete this saved recipe"});
    const user = await savedRecipeModel.findOne({user:req.params.user});
    if (!user) {
      return res.status(404).json({ msg: "user does not have saved recipe" });
    }
    const deleteSavedRecipe= await savedRecipeModel.findOneAndUpdate({user:req.params.user},{
      $pull: { saveRecipeId: req.params.id }
    },{new:true});
    res
      .status(200)
      .json({ message: "Recipe deleted successfully"});
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const savedRecipeById = async (req, res) => {
  const { id1, id2 } = req.params;
  console.log(id1,id2);

  try {
    if (req.user.id !== id1) {
      return res.status(403).json({ message: "Not authorized to save recipe" });
    }

   
    const user = await userModel.findById(id1); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingSavedRecipe = await savedRecipeModel.findOne({
      user: id1,
      saveRecipeId: id2,
    });

    if (existingSavedRecipe) {
      return res.json({ message: "Recipe already saved" });
    }

    
    const updatedRecipe = await savedRecipeModel.findOneAndUpdate(
      { user: id1 },
      { $push: { saveRecipeId: id2 } }, 
      { new: true, upsert: true } 
    );


    res.json({ message: 'Recipe saved successfully', data: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllSavedRecipe = async (req, res) => {
  const id=req.params.id;
  console.log(id, req.user.id);
  if(req.user.id!==id) return res.status(404).json({message:"not Authorized"});
  const recipe = await savedRecipeModel.findOne({user:id});
  if (!recipe)
   return res.status(402).json({ status: 0, message: "not found any saved recipe on this id" });

  if(recipe.saveRecipeId.length<=0) return res.status(202).json({message:"zero recipe saved"});
  const allRecipe=await Promise.all(recipe.saveRecipeId.map(async(each)=>{
    const recipe=await recipeModel.findById(each);
    return recipe;
  }));

    console.log(allRecipe);
  res
    .status(201)
    .json({ status: 1, message: "successfully fetched saved recipe", data:allRecipe });
};
