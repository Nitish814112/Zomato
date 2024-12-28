const express = require('express');
const connection = require('./connection');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
 

});
