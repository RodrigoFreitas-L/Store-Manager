const express = require('express');
const rescue = require('express-rescue');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar /
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productController.getAll));

app.get('/products/:id', rescue(productController.getById));

app.post('/products', rescue(productController.create));

app.post('/sales', rescue(saleController.createSaleProduct));

app.get('/sales', rescue(saleController.getAll));
app.get('/sales/:id', rescue(saleController.getById));
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;