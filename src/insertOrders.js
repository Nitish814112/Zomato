
const mysql = require('mysql2');

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //  your DB username
    password: 'root', //  your DB password
    database: 'zomato' //  your DB name
});

// Data to insert
const orders = [
    { "id": 1, "order_date": "2024-12-28 12:30:00", "customer_id": 1, "restaurant_id": 1, "delivery_boy_id": 1, "status": "pending", "total_amount": 30.00, "is_delivery": true, "delivery_status": "pending" },
    { "id": 2, "order_date": "2024-12-28 13:00:00", "customer_id": 2, "restaurant_id": 2, "delivery_boy_id": 2, "status": "completed", "total_amount": 20.00, "is_delivery": true, "delivery_status": "delivered" },
    { "id": 3, "order_date": "2024-12-28 14:00:00", "customer_id": 3, "restaurant_id": 3, "delivery_boy_id": 3, "status": "pending", "total_amount": 40.00, "is_delivery": true, "delivery_status": "pending" },
    { "id": 4, "order_date": "2024-12-28 15:00:00", "customer_id": 4, "restaurant_id": 4, "delivery_boy_id": 4, "status": "pending", "total_amount": 25.00, "is_delivery": true, "delivery_status": "pending" },
    { "id": 5, "order_date": "2024-12-28 16:00:00", "customer_id": 5, "restaurant_id": 5, "delivery_boy_id": 5, "status": "completed", "total_amount": 35.00, "is_delivery": true, "delivery_status": "delivered" },
    { "id": 6, "order_date": "2024-12-28 17:00:00", "customer_id": 6, "restaurant_id": 6, "delivery_boy_id": 6, "status": "pending", "total_amount": 50.00, "is_delivery": true, "delivery_status": "pending" },
    { "id": 7, "order_date": "2024-12-28 18:00:00", "customer_id": 7, "restaurant_id": 7, "delivery_boy_id": 7, "status": "pending", "total_amount": 15.00, "is_delivery": true, "delivery_status": "pending" },
    { "id": 8, "order_date": "2024-12-28 19:00:00", "customer_id": 8, "restaurant_id": 8, "delivery_boy_id": 8, "status": "completed", "total_amount": 18.00, "is_delivery": true, "delivery_status": "delivered" },
    { "id": 9, "order_date": "2024-12-28 20:00:00", "customer_id": 9, "restaurant_id": 9, "delivery_boy_id": 9, "status": "pending", "total_amount": 28.00, "is_delivery": true, "delivery_status": "pending" },
    { "id": 10, "order_date": "2024-12-28 21:00:00", "customer_id": 10, "restaurant_id": 10, "delivery_boy_id": 10, "status": "completed", "total_amount": 22.00, "is_delivery": true, "delivery_status": "delivered" }
  ];
// Insert data into the tableinsert
const insertData = () => {
    const query = `INSERT INTO orders (id, order_date, customer_id, restaurant_id, delivery_boy_id,status,total_amount,is_delivery,delivery_status) VALUES ?`;
    const values = orders.map(order => [order.id, order.order_date, order.customer_id, order.restaurant_id, order.delivery_boy_id,order.status,order.total_amount,order.is_delivery,order.delivery_status]);

    connection.query(query, [values], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            connection.end();
            return;
        }
        console.log('Data inserted successfully:', results);
        connection.end();
    });
};

// Connect to the database and insert data
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
    insertData();
});

