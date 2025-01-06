const { restaurants, customers, deliveryBoys, orders, orderItems } = require('./data');
const connectToDatabase = require('../mysql/connection');

const tables = [
  { name: 'restaurants', data: restaurants, columns: ['id', 'name', 'email', 'phone', 'address'] },
  { name: 'customers', data: customers, columns: ['id', 'name', 'email', 'phone', 'address'] },
  { name: 'delivery_boys', data: deliveryBoys, columns: ['id', 'name', 'email', 'phone', 'status'] },
  { name: 'orders', data: orders, columns: ['id', 'order_date', 'customer_id', 'restaurant_id', 'delivery_boy_id', 'status', 'total_amount', 'is_delivery', 'delivery_status'] },
  { name: 'order_items', data: orderItems, columns: ['id', 'order_id', 'item_name', 'item_price', 'quantity', 'total_item_amount'] },
];


const executeQuery = async (query, params = []) => {
  const pool = await connectToDatabase();
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error.message);
    throw error;
  } finally {
    pool.end(); // Close the pool connection
  }
};

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
  tables,
  executeQuery
};
