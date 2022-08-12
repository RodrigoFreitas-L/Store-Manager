const productModel = require('../models/productModel');

const verifyQuantity = (quantity) => {
  if (quantity === undefined) return { code: 400, message: '"quantity" is required' };
  if (quantity < 1) return { code: 422, message: '"quantity" must be greater than or equal to 1' };
  return true;
};

const verifyProductId = (productId) => {
  if (!productId || productId === undefined) {
    return { code: 400, message: '"productId" is required' };
  }
  return true;
};

const verifyProductExistance = async (productId) => {
  const product = await productModel.getById(productId);
  if (product === null) return { code: 404, message: 'Product not found' };
  return true;
};

const verifyProduct = async (items) => {
  const productsPromise = Promise.all(items.map(async ({ productId, quantity }) => {
    const checkQuantity = verifyQuantity(quantity);
    if (checkQuantity !== true) return checkQuantity;
    const checkProductId = verifyProductId(productId);
    if (checkProductId !== true) return checkProductId;
    const checkProductExistance = await verifyProductExistance(productId);
    if (checkProductExistance !== true) return checkProductExistance;
  })).then((data) => data.find((item) => item !== undefined));

  return productsPromise;
};

// a função acabou ficando muito complexa, e ainda apresentando erros, refactor there we go
// const verifyProduct = async (items) => {
//   const validate = await Promise.all(items.map(async ({ productId, quantity }) => {
//     if (!productId) return { code: 400, message: '"productId" is required' };
//     const isValid = await verifyProductId(productId);
//     if (!isValid) return { code: 404, message: 'Product not found' };
//     if (quantity < 1) {
//       return {
//         code: 422, message: '"quantity" must be greater than or equal to 1',
//       };
//     }
//     if (!quantity) return { code: 400, message: '"quantity" is required' };
//   }));

//   const data = validate.find((item) => item !== undefined);
//   return data;
// };

module.exports = {
  verifyProduct,
};