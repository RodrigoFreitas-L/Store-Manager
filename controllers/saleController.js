const saleService = require('../services/saleService');

const createSaleProduct = async (req, res) => {
  const { code, message, data } = await saleService.createSaleProduct(req.body);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const getAll = async (req, res) => {
  const sales = await saleService.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, message, data } = await saleService.getById(id);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

module.exports = {
  createSaleProduct,
  getAll,
  getById,
};