import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  inst: { type: String, required: true },

  qty1: { type: String, },
  qty2: { type: String,  },
  qty3: { type: String,  },
  qty4: { type: String,   },

  ing1: { type: String },
  ing2: { type: String },
  ing3: { type: String },
  ing4: { type: String },

  imgUrl: {
    type: String,
    require: true,
  },
});
const recipeModel = mongoose.model("recipes", recipeSchema);
export default recipeModel;
