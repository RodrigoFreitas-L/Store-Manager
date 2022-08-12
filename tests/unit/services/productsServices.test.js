const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('Testes em service', () => {
  describe('Retornando todos os produtos', () => {
    
    describe('em casos de falha', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves();
      });

      after(async () => {
        productModel.getAll.restore();
      });

      it('retorna um objeto com código 404 e uma mensagem referente ao erro', async () => {
        const response = await productService.getAll();
        expect(response).to.have.all.keys('code', 'message');
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal('Products not found');
      });
    });

    describe('em casos de sucesso', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([{
          id: 1,
          name: 'Martelo de Thor',
        }]);
      });

      after(async () => {
        productModel.getAll.restore();
      });

      it('retorna um objeto com o código 200 e o produto', async () => {
        const response = await productService.getAll();
        expect(response).to.have.all.keys('code', 'data');
        expect(response.data[0]).to.have.all.keys('id', 'name');
        expect(response.code).to.be.equal(200);
        expect(response.data[0].id).to.be.equal(1);
        expect(response.data[0].name).to.be.equal('Martelo de Thor');
      });
    });
  });

  describe('Retornando produtos pelo ID', () => {
    describe('em casos de falha', () => {
      before(async () => {
        sinon.stub(productModel, 'getById').resolves();
      });

      after(async () => {
        productModel.getById.restore();
      });

      it('retorna um objeto com código 404 e uma mensagem referente ao erro', async () => {
        const response = await productService.getById(238049280934);
        expect(response).to.have.all.keys('code', 'message');
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal('Product not found');
      });
    });

    describe('em casos de sucesso', () => {
      const product = { id: 1, name: 'Martelo de Thor' }
      before(async () => {
        sinon.stub(productModel, 'getById').resolves(product);
      });

      after(async () => {
        productModel.getById.restore();
      });

      it('retorna um objeto com código 200', async () => {
        const response = await productService.getById(1);
        expect(response).to.have.all.keys('code', 'data');
        expect(response.data).to.have.all.keys('id', 'name');
        expect(response.code).to.be.equal(200);
        expect(response.data.id).to.be.equal(1);
        expect(response.data.name).to.be.equal('Martelo de Thor');
      });
    });
  });
});