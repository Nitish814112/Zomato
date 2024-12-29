const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables
const createDatabase = require('./createDatabase'); // Import createDatabase function

// Function to connect to the MySQL database using a pool
const connectToDatabase = async () => {
  try {
    // Wait for the database to be created
    await createDatabase();

    // Now that the database exists, create a pool to manage connections
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'zomato', // Connect to the specified database
    });

    console.log('Connected to the MySQL server using a pool!');
    return pool.promise(); // Use promise-based pool for async/await compatibility
  } catch (err) {
    console.error('Error during database connection:', err.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
