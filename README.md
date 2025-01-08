# Project Name

- name: zomato

- [Build Status] https://github.com/Nitish814112/Zomato.git

## Description

This project is a backend application for a Zomato-like food delivery platform. It provides RESTful APIs to manage restaurants, customers, orders, orderItems and deliveryBoy. Built with Node.js and SQL, it focuses on efficient data handling, scalability, and a seamless experience for food delivery services.

- What Does the Project Do?
  - The platform enables users to browse restaurants, customers, orders view, orderItems and deliveryBoy.
  - Admins can manage restaurants, customers, orders, orderItems and deliveryBoy.
  - Provides authentication for users and admins, ensuring secure data access.

- What Problem Does It Solve?
  - Simplifies the process of connecting users with local restaurants for food delivery and takeout.
  - Streamlines restaurant management by providing tools for menu updates, order tracking, and data analysis.
  - Offers a scalable backend system that handles user authentication, order processing, and database management effectively.

- Who Is It For?
  - Customers: Individuals looking for an easy way to order food from nearby restaurants.
  - Restaurant Owners: Business owners who want to manage their track orders, and engage with customers.
  - Developers: Engineers looking for a backend template for building food delivery platforms using SQL and Node.js.

---

## Features

- List key features of your project:
  - Authentication (JWT)
  - CRUD operations
  - Pagination and filtering

---

## Prerequisites

- Specify the tools and versions required to run the project:
  ```bash
  Node.js >= 16.0
  npm >= 8.0
  MySQL >= 8.0.39 

---

## Installation

Step-by-step guide to set up the project locally:

### Clone the repository:

- git clone https://github.com/Nitish814112/Zomato.git

### Navigate to the project directory:

- cd repository(zomato)

### Install dependencies:

- npm install

### Set up environment variables:

- Create a .env file in the root directory.
- Add the required variables:
  - PORT=
  - DB_HOST=
  - DB_USER=
  - DB_PASSWORD=
  - DB_NAME=

### Start the server:

- nodemon src/index.js || node src/index.js

### Visit the API at 

- http://localhost:8080.

---

## API Documentation

- Document the available API endpoints. Use a tool like Swagger(https://zomato-ugr6.onrender.com/api-docs/), Postman, or write them in markdown.

---

## CRUD Operations
This project implements CRUD operations (Create, Read, Update, Delete) to manage the core functionalities of a Zomato-like food delivery platform. These operations are the foundation of the backend system, enabling seamless interaction with the database to handle restaurants, customers, orders, orderItems and deliveryBoy.

### CRUD Operations Overview

#### Create 
- Add new data to the system (e.g., create a new customers, restaurants, orders, orderItems and deliveryBoy.).  
- Example - Adding a restaurant to the platform.

#### Read
- Retrieve data from the database (e.g., restaurants, customers, orders, orderItems and deliveryBoy.).  
- Example - Viewing order items for a specific restaurant.

#### Update 
- Modify existing data (e.g., restaurants, customers, orders, orderItems and deliveryBoy.). 
- Example - Updating the delivery status of an order.

---

## Node.js and SQL Implementation

### Node.js:
- The backend is built using Node.js and Express.js, which handle HTTP requests and route them to the appropriate endpoints for CRUD operations.

### SQL:
- SQL databases (e.g., MySQL or PostgreSQL) are used to store and manage data. SQL queries (or ORM tools like Sequelize/Knex) handle the CRUD operations on tables such as restaurants, customers, orders, orderItems and deliveryBoy.

---

## Example Endpoints

#### Authentication

##### api/register-user
- request body
{
  "name": "Aafrin",
  "password": "aafrin123"
}

- Response body
{
  "message": "User created successfully"
}

##### api/login-user
- Response body
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJBYWZyaW4iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjI2Njk3NSwiZXhwIjoxNzM2MjcwNTc1fQ.G96LKxIzF_mZUG7ZcOEyF7sI0zVQ6a9bdyRVJtXYXMk"
}

- Login successful
{
  "message": "Login successful",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

#### Create:

POST /api/customer
Add a new customer to the database.

- - Request body: 
{
  "name": "alam",
  "email": "alam@example.com",
  "phone": "1234567899",
  "address": "123 Street, City"
}

- - Response: 
{
  "message": "Customer inserted successfully"
}

#### Read:

GET /api/top-restaurants
Retrieve a list of all restaurants.

- - Response:
[
  {
    "name": "Pasta Paradise",
    "total_sales": "35.00"
  },
  {
    "name": "Smoothie Delight",
    "total_sales": "22.00"
  },
  {
    "name": "Burger Haven",
    "total_sales": "20.00"
  },
  {
    "name": "Curry King",
    "total_sales": "18.00"
  }
]

#### Update:

PUT /api/customer/13
Update customer details.

- - Request body:
{
  "name": "aafrin alam",
  "email": "aafrinalam@example.com",
  "phone": "0987654322",
  "address": "456 Avenue, City"
}

- - Response:
{
  "message": "Customer updated successfully!"
}

---

## Project Structure

- Explain your directory structure for easier navigation.

src/
├── documentation/  # swagger
├── middleware/         # Middleware functions  
├── mysql/        # Database related file i,e createTable, models etc
├── routes/    # api       
├── test/     # test cases
└── utilities       # utility
└──index.js   # entry point
---

## Testing
1) To ensure the code works as expected
   Install Dependencies
   - npm install

2) Run Tests
   - npm test

---

## Contributing

Explain how others can contribute:

- Fork the repository.

- Create a new branch:
  - git checkout -b feature/your-feature-name

- Commit your changes:
  - git commit -m "Add your message"

- Push to the branch:
  - git push origin feature/your-feature-name

- Open a pull request.

---

## Contact

Email: n814112@gmail.com    
GitHub: n814112
LinkedIn: www.linkedin.com/in/nitish814112