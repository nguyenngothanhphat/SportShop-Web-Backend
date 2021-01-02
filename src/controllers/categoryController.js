const Category = require("../models/category");
const errorHelper = require("../helpers/errorHelper");

const createCategory = (req, res, next) => {
  const category = new Category(req.body);
  category.save((err, result) => {
    if (err) {
      return res.status(400).json({ message: errorHelper.errorHandler(err) });
    }
    res.status(200).json({ result });
  });
};

module.exports = {
  createCategory,
};
