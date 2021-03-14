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

const listProduct = (req, res, next) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-productImage")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({ message: errorHelper.errorHandler(err) });
      }
      res.status(200).json({ products })
    })
}

const listRelated = (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id categoryName')
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({ message: "Products not found" })
      }
      res.status(200).json({ products });
    })
}

const listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        message: "Categories not found"
      });
    }
    res.json(categories);
  })
}

const listBySearch = (req, res, next) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.bopdy.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select('-productImage')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'Products not found'
        })
      }
      res.json({ size: data.length, data })
    })
}

const image = (req, res, next) => {
  if (req.product.productImage.data) {
    res.set('Content-Type', req.product.productImage.contentType);
    return res.send(req.product.productImage.data);
  }
  next();
}

const listSearch = (req, res, next) => {
  const query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };

    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }

    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          message: errorHelper.errorHandler(err)
        })
      }
      res.json(products)
    }).select('-productImage');
  }
}

const decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } }
      }
    };
  });
  Product.bulkWrite(bulkOps, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        message: 'Could not update product'
      });
    }
    next();
  });
};

const createProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
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
    console.log("🚀 ~ file: productController.js ~ line 159 ~ form.parse ~ fields", fields)

    if (!!category === false) {
      return res.status(400).json({ error: "Missing category" });
    }
    if (!!brand === false) {
      return res.status(400).json({ error: "Missing brand" });
    }
    if (!!productName === false) {
      return res.status(400).json({ error: "Missing productName" });
    }
    if (!!productRate === false) {
      return res.status(400).json({ error: "Missing productRate" });
    }
    if (!!price === false) {
      return res.status(400).json({ error: "Missing price" });
    }
    if (!!description === false) {
      return res.status(400).json({ error: "Missing description" });
    }
    if (!!quantity === false) {
      return res.status(400).json({ error: "Missing quantity" });
    }
    if (!!productStatus === false) {
      return res.status(400).json({ error: "Missing productStatus" });
    }
    if (!!shipping === false) {
      return res.status(400).json({ error: "Missing shipping" });
    }

    let product = new Product(fields);

    if (files.productImage) {
      if (files.productImage.size > 1000000) {
        return res
          .status(400)
          .json({ error: "Image should be less than 1mb in size" });
      }
      product.productImage.data = fs.readFileSync(files.productImage.path);
      product.productImage.contentType = files.productImage.type;
    }

    product.save((err, result) => {
      if (err) {
        console.log("🚀 ~ file: productController.js ~ line 203 ~ product.save ~ err", err)
        return res.status(400).json({ error: errorHelper.errorHandler(err) });
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
  listProduct,
  listRelated,
  listCategories,
  listBySearch,
  image,
  listSearch,
  decreaseQuantity,
  createProduct,
  updateProduct,
  deleteProduct,
};
