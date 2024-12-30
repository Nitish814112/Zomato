const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./connection'); // Import the connection logic
const initializeTables = require('./Tables'); // Import the tables initialization script
const app = express();

dotenv.config(); // Load environment variables

// Middleware to parse JSON requests
app.use(express.json());

// Flag to track if tables are already initialized (set to true once done)
let tablesInitialized = false;

// Function to initialize the app (ensure tables are created)
const initializeApp = async () => {
  try {
    console.log('Initializing the database connection...');
    const pool = await connectToDatabase(); // Get the connection pool

    console.log('Creating necessary tables...');
    if (!tablesInitialized) {
      await initializeTables(pool); // Create all tables
      tablesInitialized = true; // Set flag to true after initialization
      console.log('Tables created successfully.');
    }

    pool.end(); // Close the connection pool after initialization
  } catch (err) {
    console.error('Error during initialization:', err.message);
    process.exit(1); // Exit if initialization fails
  }
};

initializeApp();

// Set up the root route to handle requests and ensure tables are created when accessed
app.get('/setup', async (req, res) => {
  try {
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
