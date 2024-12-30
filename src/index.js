const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./connection'); // Import the connection logic
const initializeTables = require('./Tables'); // Import the tables initialization script
const app = express();

dotenv.config(); // Load environment variables

// Middleware to parse JSON requests
app.use(express.json());

// Flag to track if tables are initialized
let tablesInitialized = false;

// Function to initialize the app and create tables (only once at the start)
const initializeApp = async () => {
  try {
    console.log('Initializing the database connection...');
    const pool = await connectToDatabase(); // Get the connection pool

    console.log('Creating necessary tables...');
    await initializeTables(pool); // Create all tables

    tablesInitialized = true; // Mark tables as initialized

    console.log('Tables created successfully.');
    pool.end(); // Close the pool after initialization
  } catch (err) {
    console.error('Error during initialization:', err.message);
    process.exit(1); // Exit if initialization fails
  }
};

// Ensure initialization happens before server starts
initializeApp()
  .then(() => {
    // After initialization, start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize the app:', err);
  });

// `/setup` route for checking status (no table creation here)
app.get('/setup', async (req, res) => {
  try {
    if (tablesInitialized) {
      console.log('Tables are already created.');
      res.status(200).send('Tables are already created!');
    } else {
      console.log('Tables are not yet created.');
      res.status(500).send('Tables are not yet created. Please try again later.');
    }
  } catch (err) {
    res.status(500).send('Error during table creation: ' + err.message);
  }
});

module.exports = app;
