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
/**
 * @swagger
 * /{entityName}:
 *   post:
 *     summary: Insert data into tables (restaurants, customers, orders, delivery_boys, order_items)
 *     description: Insert data into the specified entity (table)
 *     parameters:
 *       - name: entityName
 *         in: path
 *         required: true
 *         type: string
 *         description: The name of the entity to insert data into
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             length:
 *               type: string
 *               example: "any"
 *             every:
 *               type: string
 *               example: "any"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/:entityName', async (req, res) => {
  const { entityName } = req.params;
  let data = req.body;


  console.log('Incoming data:', data);

  // Validating table name
  if (!validTables.includes(entityName)) {
    return res.status(400).json({ error: `Invalid table name: ${entityName}` });
  }

  
  if (!Array.isArray(data)) {
    data = [data]; 
  }

  // Validate data array
  if (data.length === 0 || !data.every((item) => typeof item === 'object')) {
    return res.status(400).json({ error: 'Invalid data format. Expected JSON objects ' });
  }

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

/**
 * @swagger
 * /{entityName}/{id}:
 *   put:
 *     summary: Update data into tables (restaurants, customers, orders, delivery_boys, order_items)
 *     description: Update data for the specified entity (table) by ID
 *     parameters:
 *       - name: entityName
 *         in: path
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             length:
 *               type: string
 *               example: "any"
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:entityName/:id', async (req, res) => {
  const { entityName, id } = req.params;
  let data = req.body;

  
  console.log('Incoming data:', data);

  
  if (!validTables.includes(entityName)) {
    return res.status(400).json({ error: `Invalid table name: ${entityName}` });
  }

  
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
    .map((key) => `\`${key}\` = ?`) // skip column names with backticks
    .join(', ');  // Join all the updates with commas
  const values = Object.values(data);

  values.push(id);

  try {
    const connection = await connectToDatabase();

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

/**
 * @swagger
 * /order-summary:
 *   get:
 *     summary: Get order summary
 *     description: Retrieves the summary of orders with pagination.
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Number of results to return
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: offset
 *         description: Offset for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Order summary retrieved successfully
 *       500:
 *         description: Failed to fetch order summary
 */
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
  
  /**
 * @swagger
 * /top-restaurants:
 *   get:
 *     summary: Get top restaurants
 *     description: Retrieves the list of top restaurants.
 *     responses:
 *       200:
 *         description: Top restaurants retrieved successfully
 *       500:
 *         description: Failed to fetch top restaurants
 */
router.get('/top-restaurants', async (req, res) => {
  try {
    const result = await executeQuery(topRestaurant);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch top restaurants' });
  }
});

/**
 * @swagger
 * /busiest-delivery-boy:
 *   get:
 *     summary: Get the busiest delivery boy
 *     description: Retrieves the busiest delivery boy.
 *     responses:
 *       200:
 *         description: Busiest delivery boy retrieved successfully
 *       500:
 *         description: Failed to fetch busiest delivery boy
 */

router.get('/busiest-delivery-boy', async (req, res) => {
  try {
    const result = await executeQuery(getBusiestDelivery_Boy);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch busiest delivery boy' });
  }
});

/**
 * @swagger
 * /frequent-orders:
 *   get:
 *     summary: Get frequent order details
 *     description: Retrieves the list of frequent orders.
 *     responses:
 *       200:
 *         description: Frequent orders retrieved successfully
 *       500:
 *         description: Failed to fetch frequent orders
 */


router.get('/frequent-orders', async (req, res) => {
  try {
    const result = await executeQuery(getfrequentOrderDetails);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch frequent orders' });
  }
});

/**
 * @swagger
 * /specific-order-price/{orderId}:
 *   get:
 *     summary: Get specific order price
 *     description: Retrieves the price for a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: integer
 *           example: 12345
 *     responses:
 *       200:
 *         description: Order price retrieved successfully
 *       500:
 *         description: Failed to fetch order price
 */


router.get('/specific-order-price/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await executeQuery(getSpecificOrderPrice, [orderId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch specific order price' });
  }
});

/**
 * @swagger
 * /order/{orderId}/delivery-boy:
 *   get:
 *     summary: Get delivery boy for a specific order
 *     description: Retrieves the delivery boy assigned to a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: integer
 *           example: 12345
 *     responses:
 *       200:
 *         description: Delivery boy details retrieved successfully
 *       500:
 *         description: Failed to fetch delivery boy details
 */


router.get('/order/:orderId/delivery-boy', async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await executeQuery(getDeliveryBoyAssignedToSpecificOrder, [orderId]);
      res.json(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch delivery boy details for the order' });
    }
  });

  /**
 * @swagger
 * /specific-order-details/{orderId}:
 *   get:
 *     summary: Get specific order details
 *     description: Retrieves details for a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: integer
 *           example: 12345
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *       500:
 *         description: Failed to fetch order details
 */



router.get('/specific-order-details/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await executeQuery(getSpecificOrdersDetails, [orderId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch specific order details' });
  }
});

/**
 * @swagger
 * /out-for-delivery-orders:
 *   get:
 *     summary: Get out-for-delivery orders
 *     description: Retrieves a list of orders that are out for delivery.
 *     responses:
 *       200:
 *         description: Out-for-delivery orders retrieved successfully
 *       500:
 *         description: Failed to fetch out-for-delivery orders
 */


router.get('/out-for-delivery-orders', async (req, res) => {
  try {
    const result = await executeQuery(getOutOfDeliveryOrder);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch out-for-delivery orders' });
  }
});

/**
 * @swagger
 * /delivery-boy-orders/{id}:
 *   get:
 *     summary: Get orders assigned to a delivery boy
 *     description: Retrieves orders assigned to a specific delivery boy by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the delivery boy
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Orders assigned to delivery boy retrieved successfully
 *       500:
 *         description: Failed to fetch delivery boy orders
 */


router.get('/delivery-boy-orders/:id', async (req, res) => {
  const deliveryBoyId = req.params.id;
  try {
    const result = await executeQuery(getOrderAssignedDeliverBoy, [deliveryBoyId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch delivery boy orders' });
  }
});

/**
 * @swagger
 * /total-sales-for-restaurant/{restaurantId}:
 *   get:
 *     summary: Get total sales for a restaurant
 *     description: Retrieves total sales for a specific restaurant by its ID.
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Total sales for restaurant retrieved successfully
 *       500:
 *         description: Failed to fetch total sales for restaurant
 */


router.get('/total-sales-for-restaurant/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const result = await executeQuery(getTotalSalesForRestaurant, [restaurantId]);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch total sales for restaurant' });
  }
});

/**
 * @swagger
 * /delivery-boy-status:
 *   get:
 *     summary: Get All delivery boys
 *     description: Retrieves the status of all delivery boys.
 *     responses:
 *       200:
 *         description: Delivery boy status retrieved successfully
 *       500:
 *         description: Failed to fetch delivery boy status
 */
router.get('/delivery-boy', async (req, res) => {
  try {
    const result = await executeQuery(getDeliveryBoyStatus);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch delivery boy status' });
  }
});

/**
 * @swagger
 * /active-delivery-boys:
 *   get:
 *     summary: Get active delivery boys
 *     description: Retrieves the list of active delivery boys.
 *     responses:
 *       200:
 *         description: Active delivery boys retrieved successfully
 *       500:
 *         description: Failed to fetch active delivery boys
 */

router.get('/active-delivery-boys', async (req, res) => {
  try {
    const result = await executeQuery(getActiveDeliveryBoys);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch active delivery boys' });
  }
});

/**
 * @swagger
 * /delivery-boy-details-for-order/{orderId}:
 *   get:
 *     summary: Get delivery boy details for a specific order
 *     description: Retrieves details of the delivery boy assigned to a specific order.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: integer
 *           example: 12345
 *     responses:
 *       200:
 *         description: Delivery boy details for order retrieved successfully
 *       500:
 *         description: Failed to fetch delivery boy details for specific order
 */
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
