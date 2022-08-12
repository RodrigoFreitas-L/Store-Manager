const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products ORDER BY id');
  if (!products || products.length === 0) return null;

  return products;
};

const getById = async (id) => {
  const [[productById]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

  if (!productById || productById.length === 0) return null;

  return productById;
};

const create = async ({ name }) => {
  const [product] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);

  return {
    id: product.insertId,
    name,
  };
};

const update = async ({ id, name }) => {
  const [product] = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id]);
  
  if (!product || product.length === 0) return null;
  
  return {
    id: product.insertId,
    name,
  };
};

const deleteProduct = async (id) => {
  await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};