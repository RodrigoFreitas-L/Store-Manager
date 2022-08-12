const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();

  if (!products) return { code: 404, message: 'Products not found' };

  return { code: 200, data: products };
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { code: 404, message: 'Product not found' };

  return { code: 200, data: product };
};

module.exports = {
  getAll,
  getById,
};