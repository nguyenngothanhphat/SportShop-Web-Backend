/* Import packages */
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

/* Import model */
const Product = require("../models/product");

const errorHelper = require("../helpers/errorHelper");

const getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({ message: "Product not found" });
    }

    req.product = product;
    next();
  });
};

const readProduct = (req, res, next) => {
  req.product.productImage = undefined;
  return res.status(200).json(req.product);
};

const createProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Image could not be uploaded" });
    }

    const {
      category,
      brand,
      productName,
      productRate,
      price,
      description,
      quantity,
      productStatus,
      shipping,
    } = fields;

    if (!!category === false) {
      return res.status(400).json({ message: "Missing category" });
    }
    if (!!brand === false) {
      return res.status(400).json({ message: "Missing brand" });
    }
    if (!!productName === false) {
      return res.status(400).json({ message: "Missing productName" });
    }
    if (!!productRate === false) {
      return res.status(400).json({ message: "Missing productRate" });
    }
    if (!!price === false) {
      return res.status(400).json({ message: "Missing price" });
    }
    if (!!description === false) {
      return res.status(400).json({ message: "Missing description" });
    }
    if (!!quantity === false) {
      return res.status(400).json({ message: "Missing quantity" });
    }
    if (!!productStatus === false) {
      return res.status(400).json({ message: "Missing productStatus" });
    }
    if (!!shipping === false) {
      return res.status(400).json({ message: "Missing shipping" });
    }

    let product = new Product(fields);

    if (files.productImage) {
      if (files.productImage.size > 1000000) {
        return res
          .status(400)
          .json({ message: "Image should be less than 1mb in size" });
      }
      product.productImage.data = fs.readFileSync(files.productImage.path);
      product.productImage.contentType = files.productImage.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ message: errorHelper.errorHandler(err) });
      }
      res.status(200).json({ result });
    });
  });
};

const updateProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Image could not be uploaded" });
    }

    const {
      category,
      brand,
      productName,
      productRate,
      price,
      description,
      quantity,
      productStatus,
      shipping,
    } = fields;

    if (!!category === false) {
      return res.status(400).json({ message: "Missing category" });
    }
    if (!!brand === false) {
      return res.status(400).json({ message: "Missing brand" });
    }
    if (!!productName === false) {
      return res.status(400).json({ message: "Missing productName" });
    }
    if (!!productRate === false) {
      return res.status(400).json({ message: "Missing productRate" });
    }
    if (!!price === false) {
      return res.status(400).json({ message: "Missing price" });
    }
    if (!!description === false) {
      return res.status(400).json({ message: "Missing description" });
    }
    if (!!quantity === false) {
      return res.status(400).json({ message: "Missing quantity" });
    }
    if (!!productStatus === false) {
      return res.status(400).json({ message: "Missing productStatus" });
    }
    if (!!shipping === false) {
      return res.status(400).json({ message: "Missing shipping" });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.productImage) {
      if (files.productImage.size > 1000000) {
        return res
          .status(400)
          .json({ message: "Image should be less than 1mb in size" });
      }
      product.productImage.data = fs.readFileSync(files.productImage.path);
      product.productImage.contentType = files.productImage.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ message: errorHelper.errorHandler(err) });
      }
      res.status(200).json({ result });
    });
  });
};

const deleteProduct = (req, res, next) => {
  try {
    let product = req.product;
    product.remove();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch {
    return res.status(400).json({ message: "Cannot remove product" });
  }
};

module.exports = {
  getProductById,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
