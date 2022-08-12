const productService = require('../services/productService');

const getAll = async (req, res) => {
  const { code, message, data } = await productService.getAll();

  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { code, message, data } = await productService.getById(id);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const create = async (req, res) => {
  const { code, message, data } = await productService.create(req.body);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { code, message, data } = await productService.update({ id, name });
  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await productService.deleteProduct(id);
  if (message) return res.status(code).json({ message });

  return res.status(code).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};
