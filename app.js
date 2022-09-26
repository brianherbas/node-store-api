require('dotenv').config();

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('store api');
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    app.listen(port, console.log(`Server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
