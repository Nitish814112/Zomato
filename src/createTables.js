// General function to check if a table exists
const checkTableExists = async (pool, tableName) => {
  const query = `
    SELECT COUNT(*) AS count 
    FROM information_schema.tables 
    WHERE table_schema = ? AND table_name = ?
  `;
  try {
    const [rows] = await pool.query(query, [process.env.DB_NAME || 'zomato', tableName]);
    return rows[0].count > 0;
  } catch (err) {
    console.error(`Error checking existence of table ${tableName}:`, err.message);
    throw err;
  }
};

// General function to create a table with a given schema if it doesn't exist
const createTable = async (pool, tableName, schema) => {
  try {
    // Check if the table already exists
    const tableExists = await checkTableExists(pool, tableName);
    if (tableExists) {
      console.log(`${tableName} already exists. Skipping table creation.`);
      return;
    }

    // Create the table if it doesn't exist
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`;
    await pool.query(createTableQuery);
    console.log(`${tableName} table successfully created!`);
  } catch (err) {
    console.error(`Error creating ${tableName} table:`, err.message);
    throw err;
  }
};

// Function to initialize table creation
const initializeTable = async (pool, tableName, schema) => {
  try {
    await createTable(pool, tableName, schema);
  } catch (err) {
    console.error(`Failed to create ${tableName} table:`, err.message);
  }
};

// Export both functions
module.exports = { createTable, initializeTable };
