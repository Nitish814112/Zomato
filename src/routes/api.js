const express = require("express");
const router = express.Router();
const authenticateToken=require('../middleware/authMiddleware');
const {

  order_Summary,
  getTopRestaurt,
  getBusiestDeliveryBoy,
  getFrequestOrder,
  getSpecificOrderById,
  getDeliveryBoyByOrderId,
  getOrderDetailsByOrderId,
  getOutForDeliveryDetails,
  assignedDeliveryBoyByorderId,
  getTotalSalesByRestaurantId,
  getDeliveryBoy,
  getActiveDeliveryBoy,
  getdeliveryboyDetails,
  insertCustomer,
  updateCustomer,
  insertRestaurant,
  updateRestaurant,
  updateDeliveryBoy,
  insertOrder,
  updateOrder,
  insertOrderItem,
  updateOrderItem,
  insertDeliveryBoys,
  loginUser,
  registerUser,
} = require("./apiCallbacks");

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
router.get("/order-summary", order_Summary);
/**
 * @swagger
 * /register-user:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with name, email, and password.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "User registered successfully"
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/register-user',registerUser);

/**
 * @swagger
 * /login-user:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "johndoe@example.com"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Login successful"
 *             token:
 *               type: string
 *               example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login-user',loginUser)

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Insert a new customer
 *     description: Insert a new customer record into the database
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             email:
 *               type: string
 *               example: "johndoe@example.com"
 *             phone:
 *               type: string
 *               example: "1234567890"
 *             address:
 *               type: string
 *               example: "123 Street, City"
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
router.post("/customer",authenticateToken, insertCustomer);

/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Update a customer's details
 *     description: Update a specific customer's information
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID of the customer to update
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe Updated"
 *             email:
 *               type: string
 *               example: "johndoeupdated@example.com"
 *             phone:
 *               type: string
 *               example: "0987654321"
 *             address:
 *               type: string
 *               example: "456 Avenue, City"
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       400:
 *         description: Invalid data or ID
 *       500:
 *         description: Internal server error
 */
router.put('/customer/:id',authenticateToken, updateCustomer);

/**
 * @swagger
 * /restaurat:
 *   post:
 *     summary: Insert a new restaurant
 *     description: Insert a new restaurant record into the database
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Pizza Place"
 *             address:
 *               type: string
 *               example: "123 Pizza Street"
 *             phone:
 *               type: string
 *               example: "555-123456"
 *             email:
 *               type: string
 *               example: "pizza@place.com"
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/restaurat',authenticateToken, insertRestaurant);

/**
 * @swagger
 * /restaurat/{id}:
 *   put:
 *     summary: Update restaurant details
 *     description: Update the details of an existing restaurant
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID of the restaurant to update
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Pizza Place Updated"
 *             address:
 *               type: string
 *               example: "456 Pizza Street"
 *             phone:
 *               type: string
 *               example: "555-654321"
 *             email:
 *               type: string
 *               example: "pizzaupdated@place.com"
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       400:
 *         description: Invalid data or ID
 *       500:
 *         description: Internal server error
 */
router.put('/restaurat/:id',authenticateToken, updateRestaurant);

/**
 * @swagger
 * /deliveryboys:
 *   post:
 *     summary: Insert a new delivery boy
 *     description: Insert a new delivery boy record into the database
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             phone:
 *               type: string
 *               example: "1234567890"
 *             email:
 *               type: string
 *               example: "johndoe@delivery.com"
 *             status:
 *               type: string
 *               enum: ['active', 'inactive', 'on_leave']
 *               example: "active"
 *     responses:
 *       201:
 *         description: Delivery boy created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/deliveryboys',authenticateToken, insertDeliveryBoys);

/**
 * @swagger
 * /deliveryboys/{id}:
 *   put:
 *     summary: Update a delivery boy's details
 *     description: Update the details of an existing delivery boy
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID of the delivery boy to update
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe Updated"
 *             phone:
 *               type: string
 *               example: "0987654321"
 *             email:
 *               type: string
 *               example: "johndoeupdated@delivery.com"
 *             status:
 *               type: string
 *               enum: ['active', 'inactive', 'on_leave']
 *               example: "on_leave"
 *     responses:
 *       200:
 *         description: Delivery boy updated successfully
 *       400:
 *         description: Invalid data or ID
 *       500:
 *         description: Internal server error
 */
router.put('/deliveryboys/:id',authenticateToken, updateDeliveryBoy);

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Insert a new order
 *     description: Insert a new order record into the database
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             customer_id:
 *               type: integer
 *               example: 1
 *             restaurant_id:
 *               type: integer
 *               example: 1
 *             delivery_boy_id:
 *               type: integer
 *               example: 1
 *             total_amount:
 *               type: number
 *               format: float
 *               example: 29.99
 *             is_delivery:
 *               type: boolean
 *               example: true
 *             delivery_status:
 *               type: string
 *               enum: ['pending', 'out_for_delivery', 'delivered']
 *               example: 'pending'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/order',authenticateToken, insertOrder);

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Update an order
 *     description: Update the details of an existing order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID of the order to update
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             customer_id:
 *               type: integer
 *               example: 1
 *             restaurant_id:
 *               type: integer
 *               example: 1
 *             delivery_boy_id:
 *               type: integer
 *               example: 1
 *             total_amount:
 *               type: number
 *               format: float
 *               example: 29.99
 *             is_delivery:
 *               type: boolean
 *               example: true
 *             delivery_status:
 *               type: string
 *               enum: ['pending', 'out_for_delivery', 'delivered']
 *               example: 'delivered'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid data or ID
 *       500:
 *         description: Internal server error
 */
router.put('/order/:id',authenticateToken, updateOrder);

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Insert a new order item
 *     description: Insert a new item for an order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             order_id:
 *               type: integer
 *               example: 2
 *             item_name:
 *               type: string
 *               example: "burger"
 *             item_price:
 *               type: number
 *               format: float
 *               example: 9.00
 *             quantity:
 *               type: integer
 *               example: 5
 *             total_item_amount:
 *               type: number
 *               format: float
 *               example: 45.00
 *     responses:
 *       201:
 *         description: Order item created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/order-items',authenticateToken, insertOrderItem);

/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Update an order item
 *     description: Update the details of an existing order item
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: ID of the order item to update
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             order_id:
 *               type: integer
 *               example: 2
 *             item_name:
 *               type: string
 *               example: "cheeseburger"
 *             item_price:
 *               type: number
 *               format: float
 *               example: 10.00
 *             quantity:
 *               type: integer
 *               example: 3
 *             total_item_amount:
 *               type: number
 *               format: float
 *               example: 30.00
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       400:
 *         description: Invalid data or ID
 *       500:
 *         description: Internal server error
 */
router.put('/order-items/:id',authenticateToken, updateOrderItem);

/**
 * @swagger
 * /top-restaurants:
 *   get:
 *     summary: Get top restaurants
 *     description: Retrieves the list of top restaurants.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Top restaurants retrieved successfully
 *       500:
 *         description: Failed to fetch top restaurants
 */
router.get("/top-restaurants",authenticateToken, getTopRestaurt);

/**
 * @swagger
 * /busiest-delivery-boy:
 *   get:
 *     summary: Get the busiest delivery boy
 *     description: Retrieves the busiest delivery boy.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Busiest delivery boy retrieved successfully
 *       500:
 *         description: Failed to fetch busiest delivery boy
 */
router.get("/busiest-delivery-boy",authenticateToken, getBusiestDeliveryBoy);

/**
 * @swagger
 * /frequent-orders:
 *   get:
 *     summary: Get frequent order details
 *     description: Retrieves the list of frequent orders.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Frequent orders retrieved successfully
 *       500:
 *         description: Failed to fetch frequent orders
 */
router.get("/frequent-orders",authenticateToken, getFrequestOrder);

/**
 * @swagger
 * /specific-order-price/{orderId}:
 *   get:
 *     summary: Get specific order price
 *     description: Retrieves the price for a specific order by its ID.
 *     security:
 *       - BearerAuth: []
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
router.get("/specific-order-price/:orderId",authenticateToken, getSpecificOrderById);

/**
 * @swagger
 * /order/{orderId}/delivery-boy:
 *   get:
 *     summary: Get delivery boy for a specific order
 *     description: Retrieves the delivery boy assigned to a specific order by its ID.
 *     security:
 *       - BearerAuth: []
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
router.get("/order/:orderId/delivery-boy",authenticateToken, getDeliveryBoyByOrderId);

/**
 * @swagger
 * /specific-order-details/{orderId}:
 *   get:
 *     summary: Get specific order details
 *     description: Retrieves details for a specific order by its ID.
 *     security:
 *       - BearerAuth: []
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
router.get("/specific-order-details/:orderId",authenticateToken, getOrderDetailsByOrderId);

/**
 * @swagger
 * /out-for-delivery-orders:
 *   get:
 *     summary: Get out-for-delivery orders
 *     description: Retrieves a list of orders that are out for delivery.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Out-for-delivery orders retrieved successfully
 *       500:
 *         description: Failed to fetch out-for-delivery orders
 */
router.get("/out-for-delivery-orders",authenticateToken, getOutForDeliveryDetails);

/**
 * @swagger
 * /delivery-boy-orders/{id}:
 *   get:
 *     summary: Get orders assigned to a delivery boy
 *     description: Retrieves orders assigned to a specific delivery boy by their ID.
 *     security:
 *       - BearerAuth: []
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
router.get("/delivery-boy-orders/:id",authenticateToken, assignedDeliveryBoyByorderId);

/**
 * @swagger
 * /total-sales-for-restaurant/{restaurantId}:
 *   get:
 *     summary: Get total sales for a restaurant
 *     description: Retrieves total sales for a specific restaurant by its ID.
 *     security:
 *       - BearerAuth: []
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
router.get("/total-sales-for-restaurant/:restaurantId",authenticateToken,getTotalSalesByRestaurantId);

/**
 * @swagger
 * /delivery-boy:
 *   get:
 *     summary: Get All delivery boys
 *     description: Retrieves the status of all delivery boys.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Delivery boy status retrieved successfully
 *       500:
 *         description: Failed to fetch delivery boy status
 */
router.get("/delivery-boy",authenticateToken, getDeliveryBoy);

/**
 * @swagger
 * /active-delivery-boys:
 *   get:
 *     summary: Get active delivery boys
 *     description: Retrieves the list of active delivery boys.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Active delivery boys retrieved successfully
 *       500:
 *         description: Failed to fetch active delivery boys
 */
router.get("/active-delivery-boys",authenticateToken, getActiveDeliveryBoy);

/**
 * @swagger
 * /delivery-boy-details-for-order/{orderId}:
 *   get:
 *     summary: Get delivery boy details for a specific order
 *     description: Retrieves details of the delivery boy assigned to a specific order.
 *     security:
 *       - BearerAuth: []
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
router.get("/delivery-boy-details-for-order/:orderId",authenticateToken,getdeliveryboyDetails);

/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Health check API
 *     description: Checks if the server is running.
 *     responses:
 *       200:
 *         description: Server is healthy.
 *         content:
 *           application/json:
 *             example:
 *               status: "UP"
 *               timestamp: "2025-01-06T12:00:00Z"
 */
router.get('/healthcheck', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
