const mongoose = require('mongoose');
// remember that the db name is setting in .env -> MONGO_URI -> 'STORE-API'
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(), // Date.now(): current time provided by mongoose
  },
  company: {
    type: String,
    // enum: to limit the possible options for this company property
    // enum:['ikea','liddy', 'caressa', 'marcos']
    // but in order to setup a custom error message if the value does not match any of
    // this values ['ikea', 'liddy', 'caressa', 'marcos'] we will use 'enum' prop like so:
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      // {VALUE}    -- allow us access the value that the user is providing
      message: '{VALUE} is not sopported',
    },
  },
});

module.exports = mongoose.model('Product', productSchema); // ('products' collection in mongoDB)
