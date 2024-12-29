const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Create the MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Database host
  user: process.env.DB_USER || 'root',      // Database user
  password: process.env.DB_PASSWORD || 'Jaimatadi@814112',  // Database password
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database server:', err.message);
    process.exit(1); // Exit process if connection fails
  } else {
    console.log('Connected to the MySQL server!');
    // Check if the database exists and create it if necessary
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'zomato'}`;

    connection.query(createDatabaseQuery, (err, results) => {
      if (err) {
        console.error('Error creating database:', err.message);
        process.exit(1); // Exit process if there is an error creating the database
      } else {
        console.log(`Database ${process.env.DB_NAME || 'zomato'} is ready.`);
      }
    });
  }
});

// Now, create a new connection using the database once it's created (or exists)
const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'zomato',
});

// Export the connection for use in other modules
module.exports = dbConnection;
