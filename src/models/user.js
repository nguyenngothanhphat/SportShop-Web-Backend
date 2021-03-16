const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 30,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 60,
    },
    phoneNumber: {
      type: Number,
      maxlength: 10,
    },
    role: {
      type: Number,
      default: "Subcriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
