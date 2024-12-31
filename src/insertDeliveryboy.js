
const mysql = require('mysql2');

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //  your DB username
    password: 'root', //  your DB password
    database: 'zomato' //  your DB name
});

// Data to insert
const deliveryBoys = [
    { "id": 1, "name": "Sam Green", "email": "sam.green@example.com", "phone": "1234567890", "status": "active" },
    { "id": 2, "name": "Mike Blue", "email": "mike.blue@example.com", "phone": "2345678901", "status": "active" },
    { "id": 3, "name": "Tom Red", "email": "tom.red@example.com", "phone": "3456789012", "status": "inactive" },
    { "id": 4, "name": "Nick Yellow", "email": "nick.yellow@example.com", "phone": "4567890123", "status": "active" },
    { "id": 5, "name": "Leo Black", "email": "leo.black@example.com", "phone": "5678901234", "status": "inactive" },
    { "id": 6, "name": "Anna White", "email": "anna.white@example.com", "phone": "6789012345", "status": "active" },
    { "id": 7, "name": "Paul Violet", "email": "paul.violet@example.com", "phone": "7890123456", "status": "active" },
    { "id": 8, "name": "Eve Orange", "email": "eve.orange@example.com", "phone": "8901234567", "status": "inactive" },
    { "id": 9, "name": "Lily Pink", "email": "lily.pink@example.com", "phone": "9012345678", "status": "active" },
    { "id": 10, "name": "Grace Gray", "email": "grace.gray@example.com", "phone": "0123456789", "status": "inactive" }
  ];
  
  

// Insert data into the table
const insertData = () => {
    const query = `INSERT INTO delivery_boys (id, name, email, phone, status) VALUES ?`;
    const values = deliveryBoys.map(deliveryBoy => [deliveryBoy.id, deliveryBoy.name, deliveryBoy.email, deliveryBoy.phone, deliveryBoy.status]);

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

