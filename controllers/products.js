const Product = require('../models/product');

// async function because we will use the methods of 'mongoose'
const getAllProductsStatic = async (req, res) => {
  // async errors - Documentation: https://www.npmjs.com/package/express-async-errors
  // according to documentation: instead of use 'next(error)' like we used in node-task-manager-project
  // we will use "throw new Error('')" because we are using 'express-async-errors' dependency
  // throw new Error('testing async errors');

  // Documentation: https://mongoosejs.com/docs/api.html#model_Model-find
  const products = await Product.find({
    // featured: true,
    name: 'vase table',
  });
  res.status(200).json({ products, nbHits: products.length }); // nbHits: "number of hits"
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products route' });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
