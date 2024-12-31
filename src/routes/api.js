const express = require('express');
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

// universal function to execute dql query
const executeQuery = async (query, params = []) => {
  const pool = await connectToDatabase();
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error.message);
    throw error;
  } finally {
    pool.end(); // Close the pool connection
  }
};



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
