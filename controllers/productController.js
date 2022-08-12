const productService = require('../services/productService');

const getAll = async (req, res) => {
  const { code, message, data } = await productService.getAll();

  if (message) return res.status(code).json({ message: message });

  return res.status(code).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { code, message, data } = await productService.getById(id);

  if (message) return res.status(code).json({ message: message });

  return res.status(code).json(data);
};

module.exports = {
  getAll,
  getById,
};
