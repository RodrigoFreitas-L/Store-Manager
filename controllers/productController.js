const productService = require('../services/productService');

const getAll = async (req, res) => {
  const products = await productService.getAll();
  
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await productService.getById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};
