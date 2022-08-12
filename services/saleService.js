const saleModel = require('../models/saleModel');
const saleValidate = require('./saleValidate');

const createSaleProduct = async (items) => {
  const validate = await saleValidate.verifyProduct(items);
  if (validate !== undefined) return validate; 
  const id = await saleModel.create();

  Promise.all(
    items.map(async (itemBeingSold) => {
      await saleModel.createSaleProduct(id, itemBeingSold);
    }),
  );

  return { code: 201, data: { id, itemsSold: items } };
};

const getAll = async () => {
  const sales = await saleModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sales = await saleModel.getById(id);

  if (!sales) return { code: 404, message: 'Sale not found' };

  return { code: 200, data: sales };
};

module.exports = {
  createSaleProduct,
  getAll,
  getById,
};