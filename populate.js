// try to run: $ node populate
require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // remove all the product that are currently in Product model ('products' collection in mongoDB)
    // so in this way, every time we run 'node populate' we will remove all products before adding new ones. So:
    await Product.deleteMany();
    await Product.create(jsonProducts); // jsonProducts is an array of objects
    console.log('Success connection!');
    // once we populate db we will exit the process
    // global variable: process
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
