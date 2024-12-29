const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./connection'); // Import the connection logic
const initializeTables = require('./Tables'); // Import the tables initialization script
const app = express();

dotenv.config(); // Load environment variables

// Middleware to parse JSON requests
app.use(express.json());

// Run createDB and initializeTables before starting the server
const initializeApp = async () => {
  try {
    console.log('Initializing the database connection...');
    await connectToDatabase(); // Ensure the database is created and connection is established
    console.log('Creating necessary tables...');
    await initializeTables(); // Create all tables

    console.log('Initialization complete.');

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error during initialization:', err.message);
    process.exit(1); // Exit if initialization fails
  }
};

initializeApp();
