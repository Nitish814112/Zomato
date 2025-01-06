const { initializeTable } = require('./createTables');

// Delivery boys table schema
const deliveryBoysSchema = `
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  status ENUM('active', 'inactive', 'on_leave') DEFAULT 'active'
`;

// UserTable

const UserSchema = `
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL, 
role VARCHAR(50) DEFAULT 'user', 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
`;
// Restaurant table schema
const restaurantSchema=`
id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15),
    email VARCHAR(255) UNIQUE
`;
// Customer table schema
const customerSchema=`
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE,
phone VARCHAR(15),
address VARCHAR(255)
`;
// Orders table schema
const orderSchema=`
id INT AUTO_INCREMENT PRIMARY KEY,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  customer_id INT,
  restaurant_id INT,
  delivery_boy_id INT,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  total_amount DECIMAL(10, 2) DEFAULT 0.00,
  is_delivery BOOLEAN DEFAULT TRUE,
  delivery_status ENUM('pending', 'out_for_delivery', 'delivered') DEFAULT 'pending',
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (delivery_boy_id) REFERENCES delivery_boys(id)
`;

const orderItemsSchema=`
id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  item_name VARCHAR(255),
  item_price DECIMAL(10, 2),
  quantity INT,
  total_item_amount DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES orders(id)
`;


// Initialize all tables
const initializeTables = async (pool) => {
  try {
    console.log('Creating tables...');
    await initializeTable(pool,'delivery_boys', deliveryBoysSchema);
    await initializeTable(pool,'restaurants',restaurantSchema);
    await initializeTable(pool,'customers',customerSchema);
    await initializeTable(pool,'orders',orderSchema)
    await initializeTable(pool,'order_items',orderItemsSchema)
    await initializeTable(pool,'user',UserSchema);
    
    console.log('All tables created successfully!');
  } catch (err) {
    console.error('Error during table initialization:', err.message);
    throw err; 
  }
};

module.exports = initializeTables;
