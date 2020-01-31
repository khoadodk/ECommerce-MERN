//https://www.npmjs.com/package/formidable
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

//Middlewares
exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err || !product)
        return res.status(400).json({ error: 'The product does not exist' });
      req.product = product;
      next();
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    // console.log(req.product.photo);
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err || !product)
      return res.status(400).json({ error: 'The product does not exist' });
    res.json({
      message: 'Product deleted successfully'
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //Parses an incoming node.js request containing form data
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }

    let product = req.product;
    //using Lodash to deep clone the object
    product = _.extend(product, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log('FILES PHOTO: ', files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1 MB in size'
        });
      }
      //read the photo file and save into database
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //Parses an incoming node.js request containing form data
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }

    let product = new Product(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log('FILES PHOTO: ', files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1 MB in size'
        });
      }
      //read the photo file and save into database
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

/*
sort by sold /products?sortBy=sold&order=desc&limit=4
sort by arrival /products?sortBy=createAt&order=desc&limit=4
if no params are sent, then all products are returned
*/

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, product) => {
      if (err)
        return res.status(400).json({ error: 'The product does not exist' });
      res.send(product);
    });
};

//list all other products that in the same categories
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found'
        });
      }
      res.json(products);
    });
};

//list all categories that the product belongs to
exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) return res.status(400).json({ error: 'The categories not found' });
    res.json(categories);
  });
};

/*
We will show categories in checkbox and price range in radio button
an api request as user clicks on those checkboxes and buttons
*/
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  // console.log(order, sortBy, limit, skip, req.body.filters);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  //{ category: [ '5e28f40052bf23398431bd17', ... ], price: { '$gte': 0, '$lte': 9 } }
  console.log('findArgs', findArgs);

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found'
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.listSearch = (req, res) => {
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
    // assign category value to query.category
    if (req.query.category && req.query.category != 'All') {
      query.category = req.query.category;
    }
    // find the product based on query {name:value, category:id}
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(products);
    }).select('-photo');
  }
};

//https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
//https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/
exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } }
      }
    };
  });
  Product.bulkWrite(bulkOps, {}, (error, product) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update the product'
      });
    }
    next();
  });
};
