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

const create = async ({ name }) => {
  if (!name || name === undefined) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }
  const product = await productModel.create({ name });

  return { code: 201, data: product };
};

const update = async ({ id, name }) => {
  const productById = await productModel.getById(id);
  if (!productById) return { code: 404, message: 'Product not found' };
  if (!name || name === undefined) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }
  
  const product = await productModel.update({ id, name });
  return { code: 200, data: product };
};

const deleteProduct = async (id) => {
  const productById = await productModel.getById(id);
  console.log(productById);
  if (!productById) return { code: 404, message: 'Product not found' };

  await productModel.deleteProduct(id);

  return { code: 204 };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};