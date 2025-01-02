const { restaurants, customers, deliveryBoys, orders, orderItems } = require('./data');
const connectToDatabase = require('./connection');
const { isDataAvailableInTable, insertDataIntoTable } = require('./utility');

// Inserting data into tables
const main=async()=>{
  let connection;

  try {
    connection = await connectToDatabase();
    console.log('Connected to the database.');
   
    const tables = [
      { name: 'restaurants', data: restaurants, columns: ['id', 'name', 'email', 'phone', 'address'] },
      { name: 'customers', data: customers, columns: ['id', 'name', 'email', 'phone', 'address'] },
      { name: 'delivery_boys', data: deliveryBoys, columns: ['id', 'name', 'email', 'phone', 'status'] },
      { name: 'orders', data: orders, columns: ['id', 'order_date', 'customer_id', 'restaurant_id', 'delivery_boy_id', 'status', 'total_amount', 'is_delivery', 'delivery_status'] },
      { name: 'order_items', data: orderItems, columns: ['id', 'order_id', 'item_name', 'item_price', 'quantity', 'total_item_amount'] },
    ];

    for (const { name, data, columns } of tables) {
      if (await isDataAvailableInTable(name)) {
        console.log(`Data already available in ${name} table.`);
      } else {
        await insertDataIntoTable(connection, name, data, columns);
      }
    }

  } catch (error) {
    console.error('Error connecting to the database or inserting data:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

module.exports=main;
