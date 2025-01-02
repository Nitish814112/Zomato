const express = require('express');
const {executeQuery,insertDataIntoTable}= require('../utility')
const connectToDatabase = require('../connection');

const {
  orderSummary,
  topRestaurant,
  getBusiestDelivery_Boy,
  getfrequentOrderDetails,
  getSpecificOrderPrice,
  getSpecificOrdersDetails,
  getOutOfDeliveryOrder,
  getOrderAssignedDeliverBoy,
  getTotalSalesForRestaurant,
  getDeliveryBoyAssignedToSpecificOrder,
  getDeliveryBoyStatus,
  getActiveDeliveryBoys,
  getDeliveryBoyDetailsForSpecificOrder,
} = require('./sqlQuery');

const router = express.Router();

const validTables = ['restaurants', 'customers', 'delivery_boys', 'orders', 'order_items']; // Define valid table names

router.post('/:entityName', async (req, res) => {
  const { entityName } = req.params;
  let data = req.body;

  // Debug logs
  console.log('Incoming data:', data);

  // Validate table name
  if (!validTables.includes(entityName)) {
    return res.status(400).json({ error: `Invalid table name: ${entityName}` });
  }

  // Handle both array and single object input
  if (!Array.isArray(data)) {
    data = [data]; // Wrap single object into an array
  }

  // Validate data array
  if (data.length === 0 || !data.every((item) => typeof item === 'object')) {
    return res.status(400).json({ error: 'Invalid data format. Expected JSON objects or an array of JSON objects.' });
  }

  // Extract columns dynamically from the first object
  const columns = Object.keys(data[0]);
  console.log('Columns:', columns);

  if (columns.length === 0) {
    return res.status(400).json({ error: 'No data provided to insert.' });
  }

  try {
    const connection = await connectToDatabase();

    // Insert each item into the table
    await insertDataIntoTable(connection, entityName, data, columns);

    res.status(201).json({ message: `Data successfully inserted into ${entityName}` });

    connection.end(); // Close the connection
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data', details: error.message });
  }
});

router.put('/:entityName/:id', async (req, res) => {
  const { entityName, id } = req.params;
  let data = req.body;

  // Debug logs
  console.log('Incoming data:', data);

  // Validate table name
  if (!validTables.includes(entityName)) {
    return res.status(400).json({ error: `Invalid table name: ${entityName}` });
  }

  // Ensure data is an array
  if (!Array.isArray(data)) {
    return res.status(400).json({ error: 'Data must be an array of objects for updating.' });
  }

  // If the array has only one object, process that object
  if (data.length === 1) {
    data = data[0]; // Extract the first object
  }

  // Validate data object
  if (typeof data !== 'object' || Object.keys(data).length === 0) {
    return res.status(400).json({
      error: 'Invalid data format. Expected a JSON object with key-value pairs for updating.',
    });
  }

  // Prepare columns and values for the SQL query
  const updates = Object.keys(data)
    .map((key) => `\`${key}\` = ?`) // Escape column names with backticks
    .join(', ');  // Join all the updates with commas
  const values = Object.values(data);

  // Append the ID to the values array for the WHERE clause
  values.push(id);

  try {
    const connection = await connectToDatabase();

    // Construct the SQL query dynamically
    const query = `UPDATE \`${entityName}\` SET ${updates} WHERE id = ?`;

    console.log('Generated Query:', query);
    console.log('Values:', values);

    const [result] = await connection.execute(query, values);

    // Close the connection
    connection.end();

    // Respond based on the result
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `No record found with id: ${id} in ${entityName}` });
    }

    res.status(200).json({ message: `Record with id ${id} successfully updated in ${entityName}` });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Failed to update data', details: error.message });
  }
});


router.get('/order-summary', async (req, res) => {
    let { limit , offset} = req.query;

    limit = (isNaN(limit) || limit <= 0) ? '10' : String(limit); // setting default to 10 
    offset = (isNaN(offset) || offset < 0) ? '0' : String(offset); // setting default to 0
  
    try {
      
      const result = await executeQuery(orderSummary, [limit, offset]);
      res.status(200).json(result);  
    } catch (error) {
      console.error('Failed to fetch order summary:', error.message);
      res.status(500).send({ error: 'Failed to fetch order summary' });
    }
  });
  


router.get('/top-restaurants', async (req, res) => {
  try {
    const result = await executeQuery(topRestaurant);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch top restaurants' });
  }
});

router.get('/busiest-delivery-boy', async (req, res) => {
  try {
    const result = await executeQuery(getBusiestDelivery_Boy);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch busiest delivery boy' });
  }
});
//
router.get('/frequent-orders', async (req, res) => {
  try {
    const result = await executeQuery(getfrequentOrderDetails);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch frequent orders' });
  }
});

router.get('/specific-order-price/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await executeQuery(getSpecificOrderPrice, [orderId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch specific order price' });
  }
});

router.get('/order/:orderId/delivery-boy', async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await executeQuery(getDeliveryBoyAssignedToSpecificOrder, [orderId]);
      res.json(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch delivery boy details for the order' });
    }
  });



router.get('/specific-order-details/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await executeQuery(getSpecificOrdersDetails, [orderId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch specific order details' });
  }
});

router.get('/out-for-delivery-orders', async (req, res) => {
  try {
    const result = await executeQuery(getOutOfDeliveryOrder);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch out-for-delivery orders' });
  }
});

router.get('/delivery-boy-orders/:id', async (req, res) => {
  const deliveryBoyId = req.params.id;
  try {
    const result = await executeQuery(getOrderAssignedDeliverBoy, [deliveryBoyId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch delivery boy orders' });
  }
});

router.get('/total-sales-for-restaurant/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const result = await executeQuery(getTotalSalesForRestaurant, [restaurantId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch total sales for restaurant' });
  }
});

router.get('/delivery-boy-status', async (req, res) => {
  try {
    const result = await executeQuery(getDeliveryBoyStatus);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch delivery boy status' });
  }
});

router.get('/active-delivery-boys', async (req, res) => {
  try {
    const result = await executeQuery(getActiveDeliveryBoys);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch active delivery boys' });
  }
});

router.get('/delivery-boy-details-for-order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await executeQuery(getDeliveryBoyDetailsForSpecificOrder, [orderId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch delivery boy details for specific order' });
  }
});

// Exporting the router
module.exports = router;
