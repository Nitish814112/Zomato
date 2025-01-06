const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');


const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Zomato API',
      version: '1.0.0',
      description: 'API documentation for Zomato delivery system.',
    },
    host: 'zomato-ugr6.onrender.com/api',
    basePath: '/',
    schemes: ['https'],
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter your JWT token in the format: Bearer <token>',
      },
    },
  },
  apis: [path.join(__dirname, '../routes/api.js')], 
};

// Initialize swaggerJSDoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
