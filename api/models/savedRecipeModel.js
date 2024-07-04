import mongoose, { modelNames } from "mongoose";

const savedRecipeSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId},
    saveRecipeId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'recipe',
    }]
})

const savedRecipeModel = mongoose.model("SavedRecipe",savedRecipeSchema);
export default savedRecipeModel;