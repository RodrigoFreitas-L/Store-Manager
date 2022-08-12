const connection = require('./connection');

const create = async () => {
  const [{ insertId: id }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');

  return id;
};

const createSaleProduct = async (id, { productId, quantity }) => {
  await connection
    .execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
);
};

const serializeAll = (productInfo) => productInfo.map((product) => ({
    saleId: product.id,
    date: product.date,
    productId: product.product_id,
    quantity: product.quantity,
}));
  
const serializeById = (productInfo) => productInfo.map((product) => ({
  date: product.date,
  productId: product.product_id,
  quantity: product.quantity,
}));

const getAll = async () => {
  const queryPart1 = 'SELECT s.id, s.date, sp.product_id, sp.quantity FROM StoreManager.sales AS';
  const queryPart2 = 's JOIN StoreManager.sales_products';
  const queryPart3 = 'AS sp ON sp.sale_id = s.id ORDER BY s.id, sp.product_id';
  const gambiarraAGenteAceita = `${queryPart1} ${queryPart2} ${queryPart3}`;

  const [result] = await connection.execute(gambiarraAGenteAceita);

  return serializeAll(result);
};

const getById = async (id) => {
  const queryPart1 = 'SELECT s.id, s.date, sp.product_id, sp.quantity FROM StoreManager.sales AS';
  const queryPart2 = 's JOIN StoreManager.sales_products';
  const queryPart3 = 'AS sp ON sp.sale_id = s.id WHERE s.id = ? ORDER BY s.id, sp.product_id';
  const gambiarraAGenteAceita = `${queryPart1} ${queryPart2} ${queryPart3}`;

  const [result] = await connection.execute(gambiarraAGenteAceita, [id]);

  if (!result || result.length === 0) return null;

  return serializeById(result);
};

module.exports = {
  create,
  createSaleProduct,
  getAll,
  getById,
};