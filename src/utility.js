

const isDataAvailableInTable = async (pool,table) => {
  try {
    const validTables = ['restaurants', 'customers', 'delivery_boys', 'orders', 'order_items'];
    if (!validTables.includes(table)) {
      throw new Error(`Invalid table name: ${table}`);
    }
    const query = `SELECT COUNT(*) as count FROM ${table}`;
    const [rows] = await pool.execute(query);
    return rows[0].count > 0;
  } catch (error) {
    console.error('Error checking data availability:', error);
    throw error;
  }
};

const insertDataIntoTable = async (pool, tableName, data, columns) => {
  try {
    for (const item of data) {
      const values = columns.map((col) => item[col]);
      const placeholders = columns.map(() => '?').join(', ');
      const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
      await pool.execute(query, values);
    }
    console.log(`Inserted data into ${tableName} table.`);
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error);
  }
};



module.exports = {
  isDataAvailableInTable,
  insertDataIntoTable,
};
