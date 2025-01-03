const swaggerAutogen = require('swagger-autogen')();

// Check if running on Render or locally
const isRender = process.env.RENDER === 'true'; 

const doc = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    host: isRender ? 'zomato-ugr6.onrender.com/api' : 'localhost:8080/api', 
    schemes: isRender ? ['https'] : ['http'], 
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/api.js']; 

swaggerAutogen(outputFile, routes, doc);
