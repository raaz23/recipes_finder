import mongoose, { modelNames } from "mongoose";

const savedRecipeSchema = new mongoose.Schema({
    recipe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'recipe',
    }
})

const savedRecipeModel = mongoose.model("SavedRecipe",savedRecipeSchema);
export default savedRecipeModel;