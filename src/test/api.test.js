const request = require('supertest');
const app = require('../index'); 

describe('Sample Test', () => {
    it('should pass a simple test', async () => {
      const { expect } = await import('chai');
      expect(1 + 1).to.equal(2);
    });
  });