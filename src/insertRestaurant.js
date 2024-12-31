
const mysql = require('mysql2');

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //  your DB username
    password: 'root', //  your DB password
    database: 'zomato' //  your DB name
});

// Data to insert
const restaurants = [
    {
      "id": 1,
      "name": "Pizza Palace",
     
      "email": "contact@pizzapalace.com",
      "phone": "123-456-7890",
      "address": "123 Main Street, City, Country",
      
    },
    {
      "id": 2,
      "name": "Burger Haven",
      
      "email": "contact@burgerhaven.com",
      "phone": "123-456-7891",
      "address": "456 Elm Avenue, City, Country",
      
    },
    {
      "id": 3,
      "name": "Sushi World",
     
      "email": "contact@sushiworld.com",
      "phone": "123-456-7892",
      "address": "789 Oak Lane, City, Country",
      
    },
    {
      "id": 4,
      "name": "Taco Town",
      
      "email": "contact@tacotown.com",
      "phone": "123-456-7893",
      "address": "101 Pine Road, City, Country",
      
    },
    {
      "id": 5,
      "name": "Pasta Paradise",
      
      "email": "contact@pastaparadise.com",
      "phone": "123-456-7894",
      "address": "202 Cedar Boulevard, City, Country",
      
    },
    {
      "id": 6,
      "name": "Steakhouse Supreme",
     
      "email": "contact@steakhousesupreme.com",
      "phone": "123-456-7895",
      "address": "303 Birch Street, City, Country",
      
    },
    {
      "id": 7,
      "name": "Vegan Vibes",
     
      "email": "contact@veganvibes.com",
      "phone": "123-456-7896",
      "address": "404 Maple Lane, City, Country",
      
    },
    {
      "id": 8,
      "name": "Curry King",
      
      "email": "contact@curryking.com",
      "phone": "123-456-7897",
      "address": "505 Pine Avenue, City, Country",
      
    },
    {
      "id": 9,
      "name": "BBQ Masters",
      "email": "contact@bbqmasters.com",
      "phone": "123-456-7898",
      "address": "606 Oak Street, City, Country",
      
    },
    {
      "id": 10,
      "name": "Smoothie Delight",
      "email": "contact@smoothiedelight.com",
      "phone": "123-456-7899",
      "address": "707 Cherry Boulevard, City, Country",
      
    }
  ];

// Insert data into the table
const insertData = () => {
    const query = `INSERT INTO restaurants (id, name, email, phone, address) VALUES ?`;
    const values = restaurants.map(restaurant => [restaurant.id, restaurant.name, restaurant.email, restaurant.phone, restaurant.address]);

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

