const connectToDatabase = require('./connection'); // Use the connection pool

// Function to check if a table exists
const checkTableExists = async (tableName) => {
  const dbConnection = await connectToDatabase();
  const query = `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`;
  
  const [rows] = await dbConnection.query(query, [process.env.DB_NAME || 'zomato', tableName]);
  return rows[0].count > 0;
};

// General function to create a table with a given schema if it doesn't exist
const createTable = async (tableName, schema) => {
  const dbConnection = await connectToDatabase(); 
  
  // Check if the table already exists
  const tableExists = await checkTableExists(tableName);
  if (tableExists) {
    console.log(`${tableName} already exists. Skipping table creation.`);
    return; // Skip creating the table if it already exists
  }

  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`;

  try {
    await dbConnection.query(createTableQuery); // Execute the query
    console.log(`${tableName} table successfully created!`);  // Log successful creation
  } catch (err) {
    console.error(`Error creating ${tableName} table:`, err.message);
    throw err;
  }
};

// Function to initialize table creation
const initializeTable = async (tableName, schema) => {
  try {
    await createTable(tableName, schema);
    // Only log success for new table creation, avoid duplicate logs
  } catch (err) {
    console.error(`Failed to create ${tableName} table:`, err.message);
  }
};

// Export both functions
module.exports = { createTable, initializeTable };
