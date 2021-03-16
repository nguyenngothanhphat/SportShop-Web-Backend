const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    brand: {
      type: ObjectId,
      ref: "Brand",
      required: true,
    },
    productName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 100,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    productRate: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
    price: {
      ype: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0
    },
    productImage: {
      type: Array,
    },
    productStatus: {
      type: String,
      trim: true,
      required: true,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
