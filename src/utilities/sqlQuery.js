// sql queries
const orderSummary = `
SELECT 
    o.id AS order_id,
    o.order_date,
    o.total_amount,
    o.is_delivery,
    o.delivery_status,
    order_items.item_name,
    c.name AS customer_name,
    c.address AS customer_address,
    c.phone AS customer_phone,
    r.name AS restaurant_name,
    db.name AS delivery_boy_name,
    db.phone AS delivery_boy_phone
FROM orders o 
LEFT JOIN customers c ON o.customer_id = c.id
LEFT JOIN restaurants r ON o.restaurant_id = r.id
LEFT JOIN delivery_boys db ON o.delivery_boy_id = db.id
LEFT JOIN order_items ON o.id = order_items.order_id
LIMIT ? OFFSET ?
`;

const topRestaurant = `
SELECT 
  restaurants.name, 
  SUM(orders.total_amount) AS total_sales 
FROM 
  restaurants
JOIN 
  orders ON restaurants.id = orders.restaurant_id
WHERE 
  orders.status = 'completed'
GROUP BY 
  restaurants.name
ORDER BY 
  total_sales DESC
LIMIT 5
`;

const getBusiestDelivery_Boy = `
SELECT 
  delivery_boys.name, 
  COUNT(orders.id) AS total_orders 
FROM 
  delivery_boys
JOIN 
  orders ON orders.delivery_boy_id = delivery_boys.id
WHERE 
  orders.status = 'completed'
GROUP BY 
  delivery_boys.name
ORDER BY 
  total_orders DESC
LIMIT 1
`;

const getfrequentOrderDetails = `
SELECT item_name, COUNT(*) AS times_ordered 
FROM order_items 
GROUP BY item_name 
ORDER BY times_ordered DESC
`;

const getSpecificOrderPrice = `
SELECT order_id, SUM(total_item_amount) AS total_amount 
FROM order_items 
WHERE order_id = ? 
GROUP BY order_id
`;

const getSpecificOrdersDetails = `
SELECT * FROM order_items 
WHERE order_id = ?
`;

const getOutOfDeliveryOrder = `
SELECT * FROM orders 
WHERE delivery_status = 'out_for_delivery'
`;

const getOrderAssignedDeliverBoy = `
SELECT * FROM orders 
WHERE delivery_boy_id = ?
`;

const getDeliveryBoyAssignedToSpecificOrder = `
SELECT delivery_boys.name, delivery_boys.phone, delivery_boys.status 
FROM delivery_boys 
JOIN orders ON orders.delivery_boy_id = delivery_boys.id 
WHERE orders.id = ?
`;

const getTotalSalesForRestaurant = `
SELECT 
  restaurant_id, 
  SUM(total_amount) AS total_sales 
FROM orders 
WHERE status = 'completed' 
  AND restaurant_id = ? -- Use a parameter placeholder
GROUP BY restaurant_id
`;

const getAllOrdersForSpecificCustomer = `
SELECT * FROM orders 
WHERE customer_id = ?
`;

const getDeliveryBoyStatus = `
SELECT *  
FROM delivery_boys 
`;

const getActiveDeliveryBoys = `
SELECT * FROM delivery_boys WHERE status = 'active'
`;

const getDeliveryBoyDetailsForSpecificOrder = `
SELECT 
  delivery_boys.name AS delivery_boy,
  delivery_boys.phone AS delivery_boy_phone,
  delivery_boys.status
FROM 
  delivery_boys
LEFT JOIN 
  orders 
ON 
  orders.delivery_boy_id = delivery_boys.id
WHERE 
  orders.id = ?
`;

module.exports = {
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
};
