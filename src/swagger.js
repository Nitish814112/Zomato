const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    host: 'zomato-ugr6.onrender.com/api',
    schemes:['https'] 
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/api.js']; 

swaggerAutogen(outputFile, routes, doc);
