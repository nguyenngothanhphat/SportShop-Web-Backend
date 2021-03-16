const SubCategory = require("../models/subCategory");
const slugify = require("slugify");

exports.create = (req, res, next) => {
  const { subCategoryName, parent } = req.body;
  const subCate = new SubCategory({ subCategoryName, parent, slug: slugify(req.body.subCategoryName) });
  subCate.save((err, result) => {
    if (err) {
      return res.status(400).json({ message: "Err" })
    }
    res.status(200).json({ result })
  })
}



exports.list = async (req, res) =>
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let sub = await SubCategory.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};

exports.update = async (req, res) => {
  const { subCategoryName } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { subCategoryName, slug: slugify(subCategoryName) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub delete failed");
  }
};