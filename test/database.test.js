// const chai = require('chai');
const sinon = require('sinon');
const mysql = require('mysql2');
// const { expect } = chai;
import { describe, it } from 'mocha';
// const chai = require('chai');
// const expect = chai.expect;
const chai = await import('chai');
const { expect } = chai.default;


// Import the function to test
const connectToDatabase = require('../src/connection'); // Update the path accordingly

describe('connectToDatabase - Successful Connection', () => {
    let createPoolStub;
    let createDatabaseStub;
  

    // test successfullful connectiom
    beforeEach(() => {
      // Mock mysql.createPool and createDatabase
      createPoolStub = sinon.stub(mysql, 'createPool');
      createDatabaseStub = sinon.stub().resolves(); // Simulate database creation
    });
  
    afterEach(() => {
      // Restore original functions
      sinon.restore();
    });
  
    it('should create a database pool and return a promise', async () => {
      // Mock the pool and its promise method
      const mockPool = { promise: sinon.stub().returns('mockPromise') };
      createPoolStub.returns(mockPool);
  
      const result = await connectToDatabase();
  
      expect(createDatabaseStub).to.have.been.calledOnce; // Ensure createDatabase was called
      expect(createPoolStub).to.have.been.calledOnce; // Ensure createPool was called
      expect(result).to.equal('mockPromise'); // Assert the promise result
    });
  });
  

  // Test: Error During Connection  *************************************************************
  describe('connectToDatabase - Error Handling', () => {
    let createPoolStub;
    let createDatabaseStub;
  
    beforeEach(() => {
      createPoolStub = sinon.stub(mysql, 'createPool');
      createDatabaseStub = sinon.stub().resolves(); // Simulate successful DB creation
    });
  
    afterEach(() => {
      sinon.restore();
    });
  
    it('should log an error and exit the process if an error occurs', async () => {
      const consoleErrorStub = sinon.stub(console, 'error');
      const processExitStub = sinon.stub(process, 'exit');
      createPoolStub.throws(new Error('Connection error'));
  
      try {
        await connectToDatabase();
      } catch (err) {
        // The process would normally exit, but we catch it for test purposes
      }
  
      expect(consoleErrorStub).to.have.been.calledWithMatch('Error during database connection:');
      expect(processExitStub).to.have.been.calledWith(1);
  
      consoleErrorStub.restore();
      processExitStub.restore();
    });
  });
  
  