const subCategory = require("../models/subCategory");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(await new subCategory({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    console.log("SUB CREATE ERR ----->", err);
    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) =>
  res.json(await subCategory.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let sub = await subCategory.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();

  res.json({
    sub,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await subCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await subCategory.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub delete failed");
  }
};
