// Restaurant Dummy Data
const restaurants = [
  {
    "id": 1,
    "name": "Pizza Palace",
   
    "email": "contact@pizzapalace.com",
    "phone": "123-456-7890",
    "address": "123 Main Street, City, Country",
    
  },
  {
    "id": 2,
    "name": "Burger Haven",
    
    "email": "contact@burgerhaven.com",
    "phone": "123-456-7891",
    "address": "456 Elm Avenue, City, Country",
    
  },
  {
    "id": 3,
    "name": "Sushi World",
   
    "email": "contact@sushiworld.com",
    "phone": "123-456-7892",
    "address": "789 Oak Lane, City, Country",
    
  },
  {
    "id": 4,
    "name": "Taco Town",
    
    "email": "contact@tacotown.com",
    "phone": "123-456-7893",
    "address": "101 Pine Road, City, Country",
    
  },
  {
    "id": 5,
    "name": "Pasta Paradise",
    
    "email": "contact@pastaparadise.com",
    "phone": "123-456-7894",
    "address": "202 Cedar Boulevard, City, Country",
    
  },
  {
    "id": 6,
    "name": "Steakhouse Supreme",
   
    "email": "contact@steakhousesupreme.com",
    "phone": "123-456-7895",
    "address": "303 Birch Street, City, Country",
    
  },
  {
    "id": 7,
    "name": "Vegan Vibes",
   
    "email": "contact@veganvibes.com",
    "phone": "123-456-7896",
    "address": "404 Maple Lane, City, Country",
    
  },
  {
    "id": 8,
    "name": "Curry King",
    
    "email": "contact@curryking.com",
    "phone": "123-456-7897",
    "address": "505 Pine Avenue, City, Country",
    
  },
  {
    "id": 9,
    "name": "BBQ Masters",
    "email": "contact@bbqmasters.com",
    "phone": "123-456-7898",
    "address": "606 Oak Street, City, Country",
    
  },
  {
    "id": 10,
    "name": "Smoothie Delight",
    "email": "contact@smoothiedelight.com",
    "phone": "123-456-7899",
    "address": "707 Cherry Boulevard, City, Country",
    
  }
];
// customer dummy data
  const customers = [
    { "id": 1, "name": "John Doe", "email": "john@example.com", "phone": "1234567890", "address": "123 Elm Street, City, Country" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "phone": "2345678901", "address": "456 Oak Avenue, City, Country" },
    { "id": 3, "name": "Alice Brown", "email": "alice@example.com", "phone": "3456789012", "address": "789 Pine Road, City, Country" },
    { "id": 4, "name": "Bob White", "email": "bob@example.com", "phone": "4567890123", "address": "101 Maple Lane, City, Country" },
    { "id": 5, "name": "Charlie Green", "email": "charlie@example.com", "phone": "5678901234", "address": "202 Birch Street, City, Country" },
    { "id": 6, "name": "David Black", "email": "david@example.com", "phone": "6789012345", "address": "303 Cedar Boulevard, City, Country" },
    { "id": 7, "name": "Eve Blue", "email": "eve@example.com", "phone": "7890123456", "address": "404 Cherry Road, City, Country" },
    { "id": 8, "name": "Frank Red", "email": "frank@example.com", "phone": "8901234567", "address": "505 Elm Avenue, City, Country" },
    { "id": 9, "name": "Grace Yellow", "email": "grace@example.com", "phone": "9012345678", "address": "606 Pine Lane, City, Country" },
    { "id": 10, "name": "Hank Violet", "email": "hank@example.com", "phone": "0123456789", "address": "707 Oak Boulevard, City, Country" }
  ];
//deliver-boys dummy data
const deliveryBoys = [
  { "id": 1, "name": "Sam Green", "email": "sam.green@example.com", "phone": "1234567890", "status": "active" },
  { "id": 2, "name": "Mike Blue", "email": "mike.blue@example.com", "phone": "2345678901", "status": "active" },
  { "id": 3, "name": "Tom Red", "email": "tom.red@example.com", "phone": "3456789012", "status": "inactive" },
  { "id": 4, "name": "Nick Yellow", "email": "nick.yellow@example.com", "phone": "4567890123", "status": "active" },
  { "id": 5, "name": "Leo Black", "email": "leo.black@example.com", "phone": "5678901234", "status": "inactive" },
  { "id": 6, "name": "Anna White", "email": "anna.white@example.com", "phone": "6789012345", "status": "active" },
  { "id": 7, "name": "Paul Violet", "email": "paul.violet@example.com", "phone": "7890123456", "status": "active" },
  { "id": 8, "name": "Eve Orange", "email": "eve.orange@example.com", "phone": "8901234567", "status": "inactive" },
  { "id": 9, "name": "Lily Pink", "email": "lily.pink@example.com", "phone": "9012345678", "status": "active" },
  { "id": 10, "name": "Grace Gray", "email": "grace.gray@example.com", "phone": "0123456789", "status": "inactive" }
];
// dummy data for orders
const orders = [
  { "id": 1, "order_date": "2024-12-28 12:30:00", "customer_id": 1, "restaurant_id": 1, "delivery_boy_id": 1, "status": "pending", "total_amount": 30.00, "is_delivery": true, "delivery_status": "pending" },
  { "id": 2, "order_date": "2024-12-28 13:00:00", "customer_id": 2, "restaurant_id": 2, "delivery_boy_id": 2, "status": "completed", "total_amount": 20.00, "is_delivery": true, "delivery_status": "delivered" },
  { "id": 3, "order_date": "2024-12-28 14:00:00", "customer_id": 3, "restaurant_id": 3, "delivery_boy_id": 3, "status": "pending", "total_amount": 40.00, "is_delivery": true, "delivery_status": "pending" },
  { "id": 4, "order_date": "2024-12-28 15:00:00", "customer_id": 4, "restaurant_id": 4, "delivery_boy_id": 4, "status": "pending", "total_amount": 25.00, "is_delivery": true, "delivery_status": "pending" },
  { "id": 5, "order_date": "2024-12-28 16:00:00", "customer_id": 5, "restaurant_id": 5, "delivery_boy_id": 5, "status": "completed", "total_amount": 35.00, "is_delivery": true, "delivery_status": "delivered" },
  { "id": 6, "order_date": "2024-12-28 17:00:00", "customer_id": 6, "restaurant_id": 6, "delivery_boy_id": 6, "status": "pending", "total_amount": 50.00, "is_delivery": true, "delivery_status": "pending" },
  { "id": 7, "order_date": "2024-12-28 18:00:00", "customer_id": 7, "restaurant_id": 7, "delivery_boy_id": 7, "status": "pending", "total_amount": 15.00, "is_delivery": true, "delivery_status": "pending" },
  { "id": 8, "order_date": "2024-12-28 19:00:00", "customer_id": 8, "restaurant_id": 8, "delivery_boy_id": 8, "status": "completed", "total_amount": 18.00, "is_delivery": true, "delivery_status": "delivered" },
  { "id": 9, "order_date": "2024-12-28 20:00:00", "customer_id": 9, "restaurant_id": 9, "delivery_boy_id": 9, "status": "pending", "total_amount": 28.00, "is_delivery": true, "delivery_status": "pending" },
  { "id": 10, "order_date": "2024-12-28 21:00:00", "customer_id": 10, "restaurant_id": 10, "delivery_boy_id": 10, "status": "completed", "total_amount": 22.00, "is_delivery": true, "delivery_status": "delivered" }
];

// orderItems dummy data
  const orderItems = [
    { "id": 1, "order_id": 1, "item_name": "Pizza", "item_price": 12.99, "quantity": 2, "total_item_amount": 25.98 },
    { "id": 2, "order_id": 1, "item_name": "Coke", "item_price": 4.00, "quantity": 1, "total_item_amount": 4.00 },
    { "id": 3, "order_id": 2, "item_name": "Burger", "item_price": 10.00, "quantity": 1, "total_item_amount": 10.00 },
    { "id": 4, "order_id": 2, "item_name": "Fries", "item_price": 5.00, "quantity": 2, "total_item_amount": 10.00 },
    { "id": 5, "order_id": 3, "item_name": "Sushi", "item_price": 8.00, "quantity": 5, "total_item_amount": 40.00 },
    { "id": 6, "order_id": 4, "item_name": "Taco", "item_price": 5.00, "quantity": 2, "total_item_amount": 10.00 },
    { "id": 7, "order_id": 4, "item_name": "Guacamole", "item_price": 5.00, "quantity": 3, "total_item_amount": 15.00 },
    { "id": 8, "order_id": 5, "item_name": "Pasta", "item_price": 7.00, "quantity": 3, "total_item_amount": 21.00 },
    { "id": 9, "order_id": 6, "item_name": "Steak", "item_price": 25.00, "quantity": 2, "total_item_amount": 50.00 },
    { "id": 10, "order_id": 7, "item_name": "Vegan Burger", "item_price": 7.50, "quantity": 2, "total_item_amount": 15.00 }
  ];



  module.exports={restaurants,customers,deliveryBoys,orders,orderItems}
