const Brand = require("../models/brand");
const errorHelper = require("../helpers/errorHelper");

const getAllBrands = (req, res, next) => {
  Brand.find().exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({ message: errorHelper.errorHandler(err) });
    }
    res.status(200).json({ data });
  })
}

const getBrandById = (req, res, next, id) => {
  Brand.findById(id).exec((err, brand) => {
    if (err || !brand) {
      return res.status(400).json({ message: "Brand not found" })
    }
    req.brand = brand;
    next();
  })
}

const read = (req, res, next) => {
  return res.status(200).json(req.brand);
}

const createBrand = (req, res, next) => {
  const brand = new Brand(req.body);
  brand.save((err, result) => {
    if (err) {
      return res.status(400).json({ message: errorHelper.errorHandler(err) });
    }
    res.status(200).json({ result });
  });
};

const updateBrand = (req, res, next) => {
  const brand = req.brand;
  brand.brandName = req.body.brandName;
  brand.description = req.body.description;
  brand.save((err, data) => {
    if (err || !data) {
      return res.status(400).json({ message: errorHelper.errorHandler(err) });
    }
    res.status(200).json({ brand })
  })
}

const deleteBrand = (req, res, next) => {
  try {
    let brand = req.brand;
    brand.remove();
    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch {
    return res.status(400).json({ message: "Cannot remove category" });
  }
}

module.exports = {
  getAllBrands,
  getBrandById,
  read,
  createBrand,
  updateBrand,
  deleteBrand,
};
