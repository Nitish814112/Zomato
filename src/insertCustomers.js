
const mysql = require('mysql2');

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //  your DB username
    password: 'root', //  your DB password
    database: 'zomato' //  your DB name
});

// Data to insert
const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", address: "123 Elm Street, City, Country" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "2345678901", address: "456 Oak Avenue, City, Country" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", phone: "3456789012", address: "789 Pine Road, City, Country" },
    { id: 4, name: "Bob White", email: "bob@example.com", phone: "4567890123", address: "101 Maple Lane, City, Country" },
    { id: 5, name: "Charlie Green", email: "charlie@example.com", phone: "5678901234", address: "202 Birch Street, City, Country" },
    { id: 6, name: "David Black", email: "david@example.com", phone: "6789012345", address: "303 Cedar Boulevard, City, Country" },
    { id: 7, name: "Eve Blue", email: "eve@example.com", phone: "7890123456", address: "404 Cherry Road, City, Country" },
    { id: 8, name: "Frank Red", email: "frank@example.com", phone: "8901234567", address: "505 Elm Avenue, City, Country" },
    { id: 9, name: "Grace Yellow", email: "grace@example.com", phone: "9012345678", address: "606 Pine Lane, City, Country" },
    { id: 10, name: "Hank Violet", email: "hank@example.com", phone: "0123456789", address: "707 Oak Boulevard, City, Country" }
];

// Insert data into the table
const insertData = () => {
    const query = `INSERT INTO customers (id, name, email, phone, address) VALUES ?`;
    const values = customers.map(customer => [customer.id, customer.name, customer.email, customer.phone, customer.address]);

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

