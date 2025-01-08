const sinon = require('sinon');
const { createTable, checkTableExists } = require('../mysql/createTables');  // Adjust path as needed

describe('Database Table Functions', () => {
  let pool;

  beforeEach(() => {
    // Create a mock pool object to simulate the database interaction
    pool = {
      query: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('checkTableExists', () => {
    it('should return true if the table exists', async () => {
      const { expect } = await import('chai');

      // Mock response: table exists
      pool.query.resolves([[{ count: 1 }]]);  // Ensure we mock the response structure correctly
  
      const result = await checkTableExists(pool, 'existing_table');
      expect(result).to.be.true;
    });

    it('should return false if the table does not exist', async () => {
      const { expect } = await import('chai');

      // Mock response: table does not exist
      pool.query.resolves([[{ count: 0 }]]);  // Ensure we mock the response structure correctly
  
      const result = await checkTableExists(pool, 'non_existing_table');
      expect(result).to.be.false;
    });

    it('should throw an error if the query fails', async () => {
      const { expect } = await import('chai');

      // Simulate DB query failure
      pool.query.rejects(new Error('Query failed'));  

      try {
        await checkTableExists(pool, 'some_table');
        expect.fail('Expected error not thrown');
      } catch (err) {
        expect(err.message).to.equal('Query failed');
      }
    });
  });

  describe('createTable', () => {
    
    it('should throw an error if table creation fails', async () => {
      const { expect } = await import('chai');

      // Simulate DB error during table creation
      pool.query.rejects(new Error('Table creation failed'));

      const tableSchema = 'id INT';

      try {
        await createTable(pool, 'new_table', tableSchema);
        expect.fail('Expected error not thrown');
      } catch (err) {
        expect(err.message).to.equal('Table creation failed');
      }
    });
  });

});
