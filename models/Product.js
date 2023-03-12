import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    prices: {
      type: [Number], // [Number] is an array of numbers
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
      // [{text:"string", price: 10}] is an array of objects
    },
  },
  { timestamps: true }
);

//creates a model called Product if it doesn't exist
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
