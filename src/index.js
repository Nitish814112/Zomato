const express = require('express');
const dotenv = require('dotenv');

const app = express();
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./swagger'); //
const deliveryRoutes = require('./routes/api');
const initializeTables = require('./Tables');
const {insertDummyData} = require('./insertDummyData');
const connectToDatabase = require('./connection');
dotenv.config(); 

app.use(express.json());
app.use('/api', deliveryRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const initializeApp = async () => {
  try {
    console.log('Initializing the database connection...');
    const pool = await connectToDatabase();
    console.log('Creating necessary tables...');
    await initializeTables(pool);
    await insertDummyData(pool); // Calling main function after table creation
    console.log('Tables created successfully.');
    pool.end();
    console.log('Db connection closed!!');
  } catch (err) {
    console.error('Error during initialization:', err.message);
    process.exit(1); // Exit if initialization fails
  }
};
// Ensuring initialization happens before server starts
initializeApp()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize the app:', err);
  });



module.exports = app;
