import { expect } from 'chai';
import sinon from 'sinon';
import { createTable, initializeTable } from '../src/createTables'; // Assuming you are using ES modules

// Test: Table Creation
describe('createTable', () => {
    let poolMock;
    let queryStub;
  
    beforeEach(() => {
        // Mock the pool object and its query method
        queryStub = sinon.stub();
        poolMock = { query: queryStub };
    });
  
    afterEach(() => {
        sinon.restore(); // Restore original behavior
    });
  
    it('should create the table if it does not exist', async () => {
        // Simulate table does not exist
        queryStub
            .onFirstCall().resolves([[{ count: 0 }]]) // Response for checking table existence
            .onSecondCall().resolves(); // Response for creating the table
  
        const tableName = 'testTable';
        const schema = 'id INT PRIMARY KEY';
  
        await createTable(poolMock, tableName, schema);
  
        expect(queryStub).to.have.been.calledTwice;
        expect(queryStub.firstCall.args[0]).to.include('information_schema.tables');
        expect(queryStub.secondCall.args[0]).to.include('CREATE TABLE IF NOT EXISTS testTable');
    });
  
    it('should skip table creation if it already exists', async () => {
        // Simulate table exists
        queryStub.onFirstCall().resolves([[{ count: 1 }]]);
  
        const tableName = 'testTable';
        const schema = 'id INT PRIMARY KEY';
  
        await createTable(poolMock, tableName, schema);
  
        expect(queryStub).to.have.been.calledOnce;
        expect(queryStub.firstCall.args[0]).to.include('information_schema.tables');
    });
  
    it('should throw an error if query fails', async () => {
        queryStub.rejects(new Error('Query error'));
  
        const tableName = 'testTable';
        const schema = 'id INT PRIMARY KEY';
  
        try {
            await createTable(poolMock, tableName, schema);
        } catch (err) {
            expect(err.message).to.equal('Query error');
        }
  
        expect(queryStub).to.have.been.calledOnce;
    });
});

// Test: Initialize Table
describe('initializeTable', () => {
    let poolMock;
    let createTableStub;
  
    beforeEach(() => {
        createTableStub = sinon.stub();
        poolMock = { query: sinon.stub() }; // Mock the pool object
    });
  
    afterEach(() => {
        sinon.restore(); // Restore original behavior
    });
  
    it('should call createTable', async () => {
        const tableName = 'testTable';
        const schema = 'id INT PRIMARY KEY';
  
        createTableStub.resolves(); // Simulate successful table creation
  
        const { initializeTable } = await import('../createTable'); // Dynamically import with ESM
  
        await initializeTable(poolMock, tableName, schema);
  
        expect(createTableStub).to.have.been.calledOnceWith(poolMock, tableName, schema);
    });
  
    it('should handle errors during initialization', async () => {
        const tableName = 'testTable';
        const schema = 'id INT PRIMARY KEY';
  
        createTableStub.rejects(new Error('Creation error'));
  
        const { initializeTable } = await import('../createTable'); // Dynamically import with ESM
  
        try {
            await initializeTable(poolMock, tableName, schema);
        } catch (err) {
            expect(err.message).to.equal('Creation error');
        }
  
        expect(createTableStub).to.have.been.calledOnceWith(poolMock, tableName, schema);
    });
});
