const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id');
  if (!products || products.length === 0) return null;

  return products;
};

const getById = async (id) => {
  const [productById] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

  if (!productById || productById.length === 0) return null;

  return productById[0];
};

module.exports = {
  getAll,
  getById,
};