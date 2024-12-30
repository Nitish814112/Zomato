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

// Function to initialize the app and create tables
const initializeApp = async () => {
  try {
    if (tablesInitialized) {
      console.log('Tables already created. Skipping initialization.');
      return;
    }

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

// Initialize tables only once when the app starts
initializeApp();

// `/setup` route to trigger table creation (if not already done)
app.get('/setup', async (req, res) => {
  try {
    if (!tablesInitialized) {
      // If tables are not initialized yet, initialize them
      await initializeApp();
    }
    res.status(200).send('Tables are already created!');
  } catch (err) {
    res.status(500).send('Error during table creation: ' + err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
