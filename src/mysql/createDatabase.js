const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Function to create a database if it doesn't exist
const createDatabase = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
  });

  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'zomato'}`;

  return new Promise((resolve, reject) => {
    connection.query(createDatabaseQuery, (err, results) => {
      if (err) {
        console.error('Error creating database:', err.message);
        reject(err);
      } else {
        console.log(`Database ${process.env.DB_NAME || 'zomato'} is ready.`);
        resolve(results);
      }
      connection.end();
    });
  });
};

module.exports = createDatabase;
