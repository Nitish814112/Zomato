const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

// Define Swagger options
const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Zomato API',
      version: '1.0.0',
      description: 'API documentation for Zomato delivery system.'
    },
    host: 'zomato-ugr6.onrender.com/api',  
    basePath: '/',
    schemes: ['https'],
  },
  apis: [path.join(__dirname, './routes/api.js')] 
};

// Initialize swaggerJSDoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
