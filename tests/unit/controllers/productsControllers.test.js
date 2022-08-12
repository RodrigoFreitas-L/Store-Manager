const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

describe('Teste de service (product)', () => {
  describe('Retornando todos os produtos', () => {
    describe('Em casos de falha', () => {
      const request = {};
      const response = {};
      const msg = { code: 404, message: 'Products not found' };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'getAll').resolves(msg);
      });

      after(async () => {
        productService.getAll.restore();
      });

      it('retorna um erro 404', async () => {
        await productController.getAll(request, response);
        expect(response.status.calledWith(msg.code)).to.be.equal(true);
        expect(response.json.calledWith({ message: msg.message })).to.be.equal(true);
      });
    });

    describe('Em casos de sucesso', () => {
      const response = {};
      const request = {};
      const msg = {
        code: 200,
        data: [{
          id: 1,
          name: 'Martelo de Thor',
        }],
      };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'getAll').resolves(msg);
      });

      after(async () => {
        productService.getAll.restore();
      });

      it('retorna um objeto com código 200 e um array de produtos', async () => {
        await productController.getAll(request, response);
        expect(response.status.calledWith(msg.code)).to.be.equal(true);
        expect(response.json.calledWith(msg.data)).to.be.equal(true);
      });
    })
  });

  describe('Retornando produto pelo ID', () => {
    describe('Em casos de falha', () => {
      const request = {};
      const response = {};
      const msg = { code: 404, message: 'Product not found' };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'getById').resolves(msg);
      });

      after(async () => {
        productService.getById.restore();
      });

      it('retorna um erro 404', async () => {
        await productController.getById(request, response);
        expect(response.status.calledWith(msg.code)).to.be.equal(true);
        expect(response.json.calledWith({ message: msg.message })).to.be.equal(true);
      });
    });

    describe('Em casos de sucesso', () => {
      const response = {};
      const request = {};
      const msg = {
        code: 200,
        data: [{
          id: 1,
          name: 'Martelo de Thor',
        }],
      };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'getById').resolves(msg);
      });

      after(async () => {
        productService.getById.restore();
      });

      it('retorna um objeto com código 200 e um array de produtos', async () => {
        await productController.getById(request, response);
        expect(response.status.calledWith(msg.code)).to.be.equal(true);
        expect(response.json.calledWith(msg.data)).to.be.equal(true);
      });
    });
  });

  describe('Criando produto', () => {
    describe('Em casos de falha (quando não há nome)', () => {
      const response = {};
      const request = {};
      const msg = { code: 400, message: '"name" is required' };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'create').resolves(msg);
      });

      after(async () => {
        productService.create.restore();
      });

      it('retorna um erro 400', async () => {
        await productController.create(request, response);
        expect(response.status.calledWith(msg.code)).to.be.equal(true);
        expect(response.json.calledWith({ message: msg.message })).to.be.equal(true);
      });
    });

    describe('Em casos de falha (quando o nome contem menos de 5 caracteres)', () => {
      const response = {};
      const request = {};
      const msg = { code: 422, message: '"name" length must be at least 5 characters long' };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'create').resolves(msg);
      });

      after(async () => {
        productService.create.restore();
      });

      it('retorna um erro 422', async () => {
        await productController.create(request, response);
        expect(response.status.calledWith(msg.code)).to.be.equal(true);
        expect(response.json.calledWith({ message: msg.message })).to.be.equal(true);
      });
    });

    describe('Em casos de sucesso', () => {
      const response = {};
      const request = {};
      const body = { code: 201, data: { id: 4, name: 'Paraquedas de bigorna' } };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'create').resolves(body);
      });

      after(async () => {
        productService.create.restore();
      });

      it('retorna um novo produto criado e seu ID', async () => {
        await productController.create(request, response);
        expect(response.status.calledWith(body.code)).to.be.equal(true);
        expect(response.json.calledWith(body.data)).to.be.equal(true);
      });
    });
  });
});