// Import the dummy data
const { restaurants, customers, deliveryBoys, orders, orderItems } = require('./data');

// Import MySQL2
const mysql = require('mysql2/promise');

// Main function to handle database connection and data insertion
async function main() {
  let connection;

  try {
    // Establish the database connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'zomato',
    });

    console.log('Connected to the database.');

    // Insert data into tables
    async function insertData() {
      try {
        // Insert data into the "restaurants" table
        for (const restaurant of restaurants) {
          await connection.execute(
            'INSERT INTO restaurants (id, name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
            [restaurant.id, restaurant.name, restaurant.email, restaurant.phone, restaurant.address]
          );
        }
        console.log('Inserted data into restaurants table.');

        // Insert data into the "customers" table
        for (const customer of customers) {
          await connection.execute(
            'INSERT INTO customers (id, name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
            [customer.id, customer.name, customer.email, customer.phone, customer.address]
          );
        }
        console.log('Inserted data into customers table.');

        // Insert data into the "delivery_boys" table
        for (const deliveryBoy of deliveryBoys) {
          await connection.execute(
            'INSERT INTO delivery_boys (id, name, email, phone, status) VALUES (?, ?, ?, ?, ?)',
            [deliveryBoy.id, deliveryBoy.name, deliveryBoy.email, deliveryBoy.phone, deliveryBoy.status]
          );
        }
        console.log('Inserted data into delivery_boys table.');

        // Insert data into the "orders" table
        for (const order of orders) {
          await connection.execute(
            'INSERT INTO orders (id, order_date, customer_id, restaurant_id, delivery_boy_id, status, total_amount, is_delivery, delivery_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              order.id,
              order.order_date,
              order.customer_id,
              order.restaurant_id,
              order.delivery_boy_id,
              order.status,
              order.total_amount,
              order.is_delivery,
              order.delivery_status,
            ]
          );
        }
        console.log('Inserted data into orders table.');

        // Insert data into the "order_items" table
        for (const orderItem of orderItems) {
          await connection.execute(
            'INSERT INTO order_items (id, order_id, item_name, item_price, quantity, total_item_amount) VALUES (?, ?, ?, ?, ?, ?)',
            [
              orderItem.id,
              orderItem.order_id,
              orderItem.item_name,
              orderItem.item_price,
              orderItem.quantity,
              orderItem.total_item_amount,
            ]
          );
        }
        console.log('Inserted data into order_items table.');

        console.log('All data inserted successfully!');
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    }

    // Run the insert data function
    await insertData();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

// Execute the main function
main();

