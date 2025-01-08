const sinon = require('sinon');
const mysql = require('mysql2');
const createDatabase = require('../mysql/createDatabase'); 

describe('createDatabase', () => {
  let connectionStub;

  beforeEach(() => {
    connectionStub = sinon.createStubInstance(mysql.Connection);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should handle error if creating the database fails', async () => {
    const { expect } = await import('chai'); 

    connectionStub.query.yields(new Error('Error creating database'), null);

    sinon.stub(mysql, 'createConnection').returns(connectionStub);

    try {
     
      await createDatabase();
      expect.fail('Expected error to be thrown');
    } catch (err) {
      expect(err.message).to.equal('Error creating database');
    }
  });

  it('should reject if there is an error when creating the database', async () => {
    const { expect } = await import('chai'); 

    connectionStub.query.yields(new Error('Query failed'), null);

    sinon.stub(mysql, 'createConnection').returns(connectionStub);

    try {
      await createDatabase();
      expect.fail('Expected error to be thrown');
    } catch (err) {
      expect(err.message).to.equal('Query failed');
    }
  });
});
