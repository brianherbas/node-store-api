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
    price: { $gt: 30 },
    //(gt->"greater than"):
    // https://www.mongodb.com/docs/manual/reference/operator/query/gt/#-gt
    // https://mongoosejs.com/docs/api.html#query_Query-gt
    //  https://www.mongodb.com/docs/manual/reference/operator/query/#query-selectors
  })
    .sort('price')
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
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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
  if (numericFilters) {
    const operatorMap = {
      // https://www.mongodb.com/docs/manual/reference/operator/query/#query-selectors
      // https://mongoosejs.com/docs/api.html#Query
      // "filter on a specific numerical condition" https://hn.algolia.com/api
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    // regEx(regular expression): https://stackoverflow.com/questions/43079182/how-to-find-logic-operators-in-string-with-regex
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    // https://www.w3schools.com/jsref/jsref_replace.asp
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-` // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_replace4
    );
    // SAME AS ABOVE(but insteas of using arrow function, we use anonymous function):
    /* let filters = numericFilters.replace(regEx, function (match) {
      return `-${operatorMap[match]}-`;
    }); */
    console.log(numericFilters);
    console.log(filters);

    const options = ['price', 'rating'];
    filters = filters.split(',');
    console.log(filters, '---------');
    filters.forEach((item) => {
      // console.log(item.split('-'));
      // array destructuring:
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        // dynamic object keys:
        queryObject[field] = { [operator]: Number(value) };
        console.log(queryObject);
      }
    });
  }
  console.log('finally:');
  console.log(queryObject);

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
