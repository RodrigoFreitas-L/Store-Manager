const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');

const productModel = require('../../../models/productModel');

describe('Testa a rota GET de produtos', () => {
  describe('Retornando todos os produtos', () => {
    describe('em caso de falha', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('não retorna nenhum produto (null)', async () => {
        const response = await productModel.getAll();
        expect(response).to.be.equal(null);
      });
    });

    describe('em caso de sucesso', () => {
      before(async () => {
        const execute = [
          [
            {
              "id": 1,
              "name": "Martelo de Thor"
            },
            {
              "id": 2,
              "name": "Traje de encolhimento"
            },
            {
              "id": 3,
              "name": "Escudo do Capitão América"
            }
          ]
        ];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => connection.execute.restore());

      it('retorna todos os produtos em um array', async () => {
        const response = await productModel.getAll();
        expect(response).to.be.an('array');
        expect(response).to.have.lengthOf(3);
      });

      it('retorna todos os produtos em um array com os campos id e name', async () => {
        const response = await productModel.getAll();
        expect(response[0]).to.have.all.keys('id', 'name');
      });
    });
  });
});

describe('Testa rota GET de produtos (chamando pelo id)', () => {
  describe('em caso de falha', () => {
    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    
    after(async () => {
      connection.execute.restore();
    });

    it('não retorna nenhum produto (null)', async () => {
      const response = await productModel.getById(1);
      expect(response).to.be.equal(null);
    });
  });

  describe('em caso de sucesso', () => {
    before(async () => {
      const execute = [
        [
          {
            id: 1,
            name: 'Martelo de Thor',
          },
        ],
      ];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um produto em um array de objetos', async () => {
      const response = await productModel.getById(1);
      expect(response).to.be.an('object');
    });

    it('o produto tem as chaves id e name', async () => {
      const response = await productModel.getById(1);
      expect(response).to.have.all.keys('id', 'name');
    });
  });
});

describe('Testa rota POST de produtos', () => {
  describe('em casos de sucesso (insert)', () => {
    before(async () => {
      const execute = [{ insertId: 4 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna o produto criado', async () => {
      const response = await productModel.create({ name: 'Paraquedas de bigorna' });
      expect(response).to.be.an('object');
      expect(response).to.have.all.keys('id', 'name');
      expect(response.id).to.be.equal(4);
    });
  });
});