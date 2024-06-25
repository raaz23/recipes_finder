import recipeModel from "../models/receipyModel.js";


// Create a new recipe
export const createRecipe = async (req, res) => {
  const { title, inst, qty1, qty2, qty3, qty4, ing1, ing2, ing3, ing4, imgUrl, user } = req.body;

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
      user,
    });

    await newRecipe.save();
    res.status(201).json({ data: newRecipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    res.status(200).json({ data: recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    res.status(200).json({ data: recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Delete recipe by ID
export const deleteRecipeById = async (req, res) => {
  const  id  = req.params.id;

  try {
    const deletedRecipe = await recipeModel.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    res.status(200).json({ msg: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const savedRecipeById = async (req,res) =>{
  const id = req.params.id

  let recipe = await SavedRecipe.findOne({recipe:id})

  if(recipe) return res.json({message:"recipe already saved"})

  recipe = await SavedRecipe.create({recipe:id})
  
  res.json({message:"Recipe saved Successfully..!"})
}


