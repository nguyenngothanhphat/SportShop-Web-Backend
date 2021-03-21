const Brand = require("../models/brand");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(await new Brand({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    console.log("SUB CREATE ERR ----->", err);
    res.status(400).send("Create brand failed");
  }
};

exports.list = async (req, res) =>
  res.json(await Brand.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let brand = await Brand.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ brand: brand })
    .populate("brand")
    .exec();

  res.json({
    brand,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Brand.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Brand update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Brand.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Brand delete failed");
  }
};
