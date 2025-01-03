const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? 'zomato-ugr6.onrender.com/api' : 'localhost:8080/api';

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: host,
    schemes: isProduction ? ['https'] : ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/api.js']; 

swaggerAutogen(outputFile, routes, doc);
