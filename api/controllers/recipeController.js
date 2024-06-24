import recipeModel from "../models/receipyModel";
export const Recipe = async (req, res) => {
  const {
    title,
    inst,
    qty1,
    qty2,
    qty3,
    qty4,
    Ing1,
    ing2,
    ing3,
    ing4,
    imgUrl,
  } = req.body;

  try {
    const recipe = await new recipeModel({
      title,
      inst,
      qty1,
      qty2,
      qty3,
      qty4,
      Ing1,
      ing2,
      ing3,
      ing4,
      imgUrl,
    });
    recipe.save();
    res.status(201).json({ data: recipe });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
