const express = require("express");
const router = express.Router();
const {
  insertData,
  updateData,
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
} = require("./apiCallbacks");

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
router.post("/:entityName", insertData);
/**
 * @swagger
 * /{entityName}/{id}:
 *   put:
 *     summary: Update data for tables (restaurants, customers, orders, delivery_boys, order_items)
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
router.put("/:entityName/:id", updateData);
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
router.get("/top-restaurants", getTopRestaurt);

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
router.get("/busiest-delivery-boy", getBusiestDeliveryBoy);

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
router.get("/frequent-orders", getFrequestOrder);

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
router.get("/specific-order-price/:orderId", getSpecificOrderById);

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
router.get("/order/:orderId/delivery-boy", getDeliveryBoyByOrderId);

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
router.get("/specific-order-details/:orderId", getOrderDetailsByOrderId);

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
router.get("/out-for-delivery-orders", getOutForDeliveryDetails);

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
router.get("/delivery-boy-orders/:id", assignedDeliveryBoyByorderId);

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
router.get("/total-sales-for-restaurant/:restaurantId",getTotalSalesByRestaurantId);

/**
 * @swagger
 * /delivery-boy:
 *   get:
 *     summary: Get All delivery boys
 *     description: Retrieves the status of all delivery boys.
 *     responses:
 *       200:
 *         description: Delivery boy status retrieved successfully
 *       500:
 *         description: Failed to fetch delivery boy status
 */
router.get("/delivery-boy", getDeliveryBoy);

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
router.get("/active-delivery-boys", getActiveDeliveryBoy);

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
router.get("/delivery-boy-details-for-order/:orderId",getdeliveryboyDetails);
// Exporting the router
module.exports = router;
