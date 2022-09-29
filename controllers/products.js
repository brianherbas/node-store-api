const Product = require('../models/product');

// async function because we will use the methods of 'mongoose'
const getAllProductsStatic = async (req, res) => {
  // async errors - Documentation: https://www.npmjs.com/package/express-async-errors
  // according to documentation: instead of use 'next(error)' like we used in node-task-manager-project
  // we will use "throw new Error('')" because we are using 'express-async-errors' dependency
  // throw new Error('testing async errors');

  // Documentation: https://mongoosejs.com/docs/api.html#model_Model-find
  // const search = 'ab';
  const products = await Product.find({
    // featured: true,
    // name: 'vase table',
    // Documentation: https://www.mongodb.com/docs/manual/reference/operator/query/
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex
    // name: { $regex: search, $options: 'i' }, // all the items there is at least an 'ab'
  })
    .sort('name')
    .select('name price');
  // .limit(10) // limit(): Specifies the maximum number of documents the query will return. https://mongoosejs.com/docs/api.html#query_Query-limit
  // .skip(2); // skip(): Specifies the number of documents to skip. https://mongoosejs.com/docs/api.html#query_Query-skip
  // select() Documentation: https://mongoosejs.com/docs/api.html#query_Query-select
  // .sort('name -price'); // sort() Documentation: https://mongoosejs.com/docs/api.html#query_Query-sort
  res.status(200).json({ products, nbHits: products.length }); // nbHits: "number of hits"
};

const getAllProducts = async (req, res) => {
  // console.log(req.query); remember req.query is an object
  // as a side note: we can rename the the keys of our req.query as the name we want
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    // create new key called 'featured' into 'queryObject'
    // we pass the boolean we have received as 'string' to 'bool' data type
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // queryObject.name = name;
    queryObject.name = { $regex: name, $options: 'i' };
  }

  // console.log(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    // console.log(sort);
    // if user want to sort by, eg: 'name,-price' then to fix query syntax:
    const sortList = sort.split(',').join(' '); // 'name,-price' to 'name -price'
    result = result.sort(sortList);
  } else {
    result = result.sort('createAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // pagination:
  const page = Number(req.query.page) || 1; // by default = 1
  const limit = Number(req.query.limit) || 10; // by default = 10
  const skip = (page - 1) * limit;
  // if request -> "...&limit=3&page=1" then 'skip' = 0
  // if request -> "...&limit=3&page=2" then 'skip' = 3
  // if request -> "...&limit=3&page=3" then 'skip' = 6
  // and on and on and on...
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length }); // nbHits: "number of hits"
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
