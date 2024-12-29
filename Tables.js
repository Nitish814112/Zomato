const { initializeTable } = require('./createTables');

// Delivery boys table schema
const deliveryBoysSchema = `
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  status ENUM('active', 'inactive', 'on_leave') NOT NULL DEFAULT 'active'
`;

// Initialize all tables
const initializeTables = async () => {
  try {
    console.log('Creating tables...');
    await initializeTable('delivery_boys', deliveryBoysSchema);
    // Add similar calls for other tables
    // await initializeTable('another_table', anotherTableSchema);
    console.log('All tables created successfully!');
  } catch (err) {
    console.error('Error during table initialization:', err.message);
    throw err; // Ensure that initialization failure stops the app
  }
};

module.exports = initializeTables;
