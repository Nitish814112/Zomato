const {executeQuery}= require('../utilities/utility')
const connectToDatabase = require('../mysql/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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


// Register User

const registerUser=async (req, res) => {
  const { name, password } = req.body;
  const pool= await connectToDatabase();


  const encryptPass = await bcrypt.hash(password, 10);

  await pool.query('INSERT INTO user (name, password) VALUES (?, ?)', [name, encryptPass]);

  res.status(201).json({ message: 'User created successfully' });
};
// login opr for user
const loginUser = async (req, res) => {
  const { name, password } = req.body;

  // Validate input
  if (!name || !password) {
    return res.status(400).json({ message: 'Please provide both username and password' });
  }

  try {
    const pool = await connectToDatabase();
    const [rows] = await pool.query('SELECT * FROM user WHERE name = ?', [name]);

    // Check if user exists
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Get the first user row
    const user = rows[0];

    // Compare password with the stored encrypted password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token if credentials match
    const token = jwt.sign(
      { userId: user.id, name: user.name, role: user.role },
      'your_jwt_secret', // Secret key
      { expiresIn: '1h' } // Token expiration time
    );

    // Respond with token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// insert opr for customer
const insertCustomer=async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name, email, phone' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
      INSERT INTO customers (name, email, phone, address) 
      VALUES (?, ?, ?, ?)
    `;
    await connection.execute(query, [name, email, phone, address || null]);
    connection.end();

    res.status(201).json({ message: 'Customer inserted successfully' });
  } catch (error) {
    console.error('Error inserting customer:', error);
    res.status(500).json({ error: 'Failed to insert customer', details: error.message });
  }
};

// update opr.

const updateCustomer = async (req, res) => {
  const { id } = req.params; // Get the customer ID from the URL parameter
  console.log(id);
  const { name, email, phone, address } = req.body;

  if (!name && !email && !phone && !address) {
    return res.status(400).json({ error: 'At least one field must be provided for update.' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
      UPDATE customers
      SET name = ?, email = ?, phone = ?, address = ?
      WHERE id = ?
    `;
    await connection.execute(query, [name || null, email || null, phone || null, address || null, id]);
    connection.end();

    res.status(200).json({ message: 'Customer updated successfully!' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer', details: error.message });
  }
};

 // insert opr for restaurat
const insertRestaurant=async (req, res) => {
  const { name, address, phone, email } = req.body;

  if (!name || !address || !phone || !email) {
    return res.status(400).json({ error: 'Missing required fields: name, address, phone , email' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
      INSERT INTO restaurants (name, address, phone, email) 
      VALUES (?, ?, ?, ?)
    `;
    await connection.execute(query, [name, address, phone, email || null]);
    connection.end();

    res.status(201).json({ message: 'New restaurant added successfully' });
  } catch (error) {
    console.error('Error inserting restaurant:', error);
    res.status(500).json({ error: 'Failed to add new restaurant ', details: error.message });
  }
};

// update opr

const updateRestaurant = async (req, res) => {
  const { id } = req.params; // Get the restaurant ID from the URL parameter
  const { name, address, phone, email } = req.body;

  if (!name && !address && !phone && !email) {
    return res.status(400).json({ error: 'At least one field must be provided for update.' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
      UPDATE restaurants
      SET name = ?, address = ?, phone = ?, email = ?
      WHERE id = ?
    `;
    await connection.execute(query, [name || null, address || null, phone || null, email || null, id]);
    connection.end();

    res.status(200).json({ message: 'Restaurant updated successfully!' });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Failed to update restaurant', details: error.message });
  }
};

 // insert opr for delivery boy
const insertDeliveryBoys=async (req, res) => {
  const { name, phone, email} = req.body;
  console.log(name);
  console.log(phone);
  console.log(email);

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Missing required fields: name, phone, email' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
      INSERT INTO delivery_boys (name, phone, email) 
      VALUES (?, ?, ?)
    `;
    await connection.execute(query, [name, phone, email || null]);
    connection.end();

    res.status(201).json({ message: 'Delivery boy details inserted successfully' });
  } catch (error) {
    console.error('Error inserting delivery boy:', error);
    res.status(500).json({ error: 'Failed to insert delivery boy', details: error.message });
  }
};

// update opr of delivery boy

const updateDeliveryBoy = async (req, res) => {
  const { id } = req.params; // Get the delivery boy ID from the URL parameter
  const { name, phone, email, status } = req.body;

  if (!name && !phone && !email && !status) {
    return res.status(400).json({ error: 'At least one field must be provided for update.' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
      UPDATE delivery_boys
      SET name = ?, phone = ?, email = ?, status = ?
      WHERE id = ?
    `;
    await connection.execute(query, [name || null, phone || null, email || null, status || 'active', id]);
    connection.end();

    res.status(200).json({ message: 'Delivery boy updated successfully!' });
  } catch (error) {
    console.error('Error updating delivery boy:', error);
    res.status(500).json({ error: 'Failed to update delivery boy', details: error.message });
  }
};

// insert opr for order
const insertOrder=async (req, res) => {
  const { customer_id,restaurant_id,delivery_boy_id,total_amount} = req.body;

  if (!customer_id || !restaurant_id || !delivery_boy_id || !total_amount ) {
    return res.status(400).json({ error: 'Missing required fields: customer_id,restaurant_id,delivery_boy_id,total_amount' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
    INSERT INTO orders (customer_id, restaurant_id, delivery_boy_id, total_amount)
    VALUES  (?, ?, ?, ?)
    `;
    await connection.execute(query, [customer_id,restaurant_id,delivery_boy_id,total_amount|| null]);
    connection.end();

    res.status(201).json({ message: 'Order confirmed!!' });
  } catch (error) {
    console.error('Error inserting order:', error);
    res.status(500).json({ error: 'Failed to order confirm', details: error.message });
  }
};

// update opr
const updateOrder = async (req, res) => {
  const { id } = req.params; 
  const { customer_id, restaurant_id, delivery_boy_id, status, total_amount, is_delivery, delivery_status } = req.body;

  if (!customer_id && !restaurant_id && !status && !total_amount && !is_delivery && !delivery_status) {
    return res.status(400).json({ error: 'At least one field must be provided for update.' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
      UPDATE orders
      SET customer_id = ?, restaurant_id = ?, delivery_boy_id = ?, status = ?, total_amount = ?, is_delivery = ?, delivery_status = ?
      WHERE id = ?
    `;
    await connection.execute(query, [customer_id || null, restaurant_id || null, delivery_boy_id || null, status || 'pending', total_amount || 0.00, is_delivery || true, delivery_status || 'pending', id]);
    connection.end();

    res.status(200).json({ message: 'Order updated successfully!' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order', details: error.message });
  }
};

//insert opr for orderItem
const insertOrderItem=async (req, res) => {
  const { order_id,item_name,item_price,quantity,total_item_amount} = req.body;

  if (!order_id || !item_name || !item_price || !quantity ||!total_item_amount ) {
    return res.status(400).json({ error: 'Missing required fields: order_id,item_name,item_price,quantity,total_item_amount' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
    INSERT INTO order_items (order_id,item_name,item_price,quantity,total_item_amount)
    VALUES  (?, ?, ?, ?, ?)
    `;
    await connection.execute(query, [order_id,item_name,item_price,quantity,total_item_amount|| null]);
    connection.end();

    res.status(201).json({ message: 'Order placed successfully!!' });
  } catch (error) {
    console.error('Error placing  order:', error);
    res.status(500).json({ error: 'Failed to place order', details: error.message });
  }
};

// update opr
const updateOrderItem = async (req, res) => {
  const { id } = req.params; 
  const { order_id, item_name, item_price, quantity, total_item_amount } = req.body;

  if (!item_name && !item_price && !quantity && !total_item_amount) {
    return res.status(400).json({ error: 'At least one field must be provided for update.' });
  }

  try {
    const connection = await connectToDatabase();
    const query = `
      UPDATE order_items
      SET order_id = ?, item_name = ?, item_price = ?, quantity = ?, total_item_amount = ?
      WHERE id = ?
    `;
    await connection.execute(query, [order_id || null, item_name || null, item_price || null, quantity || null, total_item_amount || null, id]);
    connection.end();

    res.status(200).json({ message: 'Order item updated successfully!' });
  } catch (error) {
    console.error('Error updating order item:', error);
    res.status(500).json({ error: 'Failed to update order item', details: error.message });
  }
};
  
  const order_Summary=async (req, res) => {
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
  };
  

  const getTopRestaurt=async (req, res) => {
    try {
      const result = await executeQuery(topRestaurant);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch top restaurants' });
    }
  };

  const getBusiestDeliveryBoy=async (req, res) => {
    try {
      const result = await executeQuery(getBusiestDelivery_Boy);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch busiest delivery boy' });
    }
  };

  const getFrequestOrder=async (req, res) => {
    try {
      const result = await executeQuery(getfrequentOrderDetails);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch frequent orders' });
    }
  };

  const getSpecificOrderById=async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await executeQuery(getSpecificOrderPrice, [orderId]);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch specific order price' });
    }
  };
  
  const getDeliveryBoyByOrderId=async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await executeQuery(getDeliveryBoyAssignedToSpecificOrder, [orderId]);
      res.json(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch delivery boy details for the order' });
    }
  };

  const getOrderDetailsByOrderId= async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await executeQuery(getSpecificOrdersDetails, [orderId]);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch specific order details' });
    }
  };

  const getOutForDeliveryDetails= async (req, res) => {
    try {
      const result = await executeQuery(getOutOfDeliveryOrder);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch out-for-delivery orders' });
    }
  };

  const assignedDeliveryBoyByorderId=async (req, res) => {
    const deliveryBoyId = req.params.id;
    try {
      const result = await executeQuery(getOrderAssignedDeliverBoy, [deliveryBoyId]);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch delivery boy orders' });
    }
  };

  const getTotalSalesByRestaurantId= async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const result = await executeQuery(getTotalSalesForRestaurant, [restaurantId]);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch total sales for restaurant' });
    }
  };

  const getDeliveryBoy= async (req, res) => {
    try {
      const result = await executeQuery(getDeliveryBoyStatus);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch delivery boy status' });
    }
  };

  const getActiveDeliveryBoy=async (req, res) => {
    try {
      const result = await executeQuery(getActiveDeliveryBoys);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch active delivery boys' });
    }
  };

  const getdeliveryboyDetails=async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await executeQuery(getDeliveryBoyDetailsForSpecificOrder, [orderId]);
      res.json(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch delivery boy details for specific order' });
    }
  };
  

  module.exports={registerUser,loginUser,insertCustomer, updateOrder, updateOrderItem, updateCustomer,
     updateRestaurant, updateDeliveryBoy, insertOrderItem, insertOrder,
      insertRestaurant, insertDeliveryBoys,order_Summary,
    getTopRestaurt,getBusiestDeliveryBoy,getFrequestOrder,
    getSpecificOrderById,getDeliveryBoyByOrderId,getOrderDetailsByOrderId,
    getOutForDeliveryDetails,assignedDeliveryBoyByorderId,getTotalSalesByRestaurantId,
    getDeliveryBoy,getActiveDeliveryBoy,getdeliveryboyDetails}