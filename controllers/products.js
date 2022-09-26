// async function because we will use the methods of 'mongoose'
const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: 'products testing route' });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products route' });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
