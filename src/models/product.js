const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
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
    },
    productRate: {
      type: Number,
      maxlength: 1,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxLength: 35,
    },
    description: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0
    },
    productImage: {
      data: Buffer,
      contentType: String,
    },
    productStatus: {
      type: String,
      trim: true,
      required: true,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
