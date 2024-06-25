import mongoose from "mongoose";
const recipeSchema = new mongoose. Schema({
    title:{type: String , required:true},
    inst:{type :String, required:true },

    qty1:{type :String, required:true },
    qty2:{type :String, required:true },
    qty3:{type :String, required:true },
    qty4:{type :String, required:true },

    ing1: {type: String},
    ing2: {type: String},
    ing3: {type: String},
    ing4: {type: String},

    qty1: {type: String},
    qty2: {type: String},
    qty3: {type: String},
    qty4: {type: String},

    imgUrl: {type: String, require:true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",  
    }
    });
 const recipeModel = mongoose.model("recipes", recipeSchema);
 export default recipeModel;
