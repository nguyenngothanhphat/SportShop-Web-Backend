const Brand = require("../models/brand");
const errorHelper = require("../helpers/errorHelper");

const createBrand = (req, res, next) => {
  const brand = new Brand(req.body);
  brand.save((err, result) => {
    if (err) {
      return res.status(400).json({ message: errorHelper.errorHandler(err) });
    }
    res.status(200).json({ result });
  });
};

module.exports = {
    createBrand,
};
