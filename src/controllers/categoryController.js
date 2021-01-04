const Category = require("../models/category");
const errorHelper = require("../helpers/errorHelper");

const getAllCategories = (req, res, next) => {
  Category.find().exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({message: errorHelper.errorHandler(err)});
    }
    res.status(200).json({data});
  })
}

const getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ message: "Category not found" });
    }
    req.category = category;
    next();
  })
}

const read = (req, res, next) => {
  return res.status(200).json(req.category);
}

const createCategory = (req, res, next) => {
  const category = new Category(req.body);
  category.save((err, result) => {
    if (err) {
      return res.status(400).json({ message: errorHelper.errorHandler(err) });
    }
    res.status(200).json({ result });
  });
};

const updateCategory = (req, res, next) => {
  const category = req.category;
  category.categoryName = req.body.categoryName;
  category.description = req.body.description;
  category.save((err, data) => {
    if (err || !data) {
      {
        return res.status(400).json({ message: errorHelper.errorHandler(err) })
      }
    }

    res.status(200).json({ data });
  })
}

const deleteCategory = (req, res, next) => {
  try {
    let category = req.category;
    category.remove();
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch {
    return res.status(400).json({ message: "Cannot remove category" });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  read,
  createCategory,
  updateCategory,
  deleteCategory,
};
