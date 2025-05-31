🛠️ Mini E-Commerce API
This comprehensive documentation covers both the backend API and frontend application for a basic e-commerce system with authentication, product management, and order handling.

📦 Backend API Setup Instructions
Run the project with:
bashyarn install
yarn start:dev
To seed an initial admin user:
bashyarn seed:admin

📁 Auth Endpoints
🔐 Register

Endpoint: POST /auth/register
Body:

json{
  "email": "majd@example.com",
  "password": "password123",
  "name": "Majd"
}

Response: 201 Created

🔑 Login

Endpoint: POST /auth/login
Body:

json{
  "email": "majd@example.com",
  "password": "password123"
}

Response: Returns a JWT token


👤 Users Endpoints
🙋‍♂️ Get Current User

Endpoint: GET /users/me
Headers:

httpAuthorization: Bearer <JWT_TOKEN>

Response:

json{
  "id": "uuid",
  "email": "majd@example.com",
  "name": "Majd",
  "role": "ADMIN"
}

🛒 Products Endpoints
➕ Create Product (Admin Only)

Endpoint: POST /products
Headers: Bearer token (admin required)
Body:

json{
  "name": "PlayStation 5",
  "price": 499.99,
  "stock": 15
}
📃 Get All Products

Endpoint: GET /products
Response: List of all available products

✏️ Update Product (Admin Only)

Endpoint: PUT /products/:id
Headers: Bearer token (admin required)
Body:

json{
  "name": "Updated Product",
  "price": 499.99,
  "stock": 20
}
🗑️ Delete Product (Admin Only)

Endpoint: DELETE /products/:id
Headers: Bearer token (admin required)


📦 Orders Endpoints
📝 Create Order

Endpoint: POST /orders
Headers: Bearer token (customer required)
Body:

json{
  "items": [
    {
      "productId": "uuid-of-product",
      "quantity": 2
    }
  ]
}
📑 Get Orders

Endpoint: GET /orders
Headers: Bearer token
Behavior:

If ADMIN: returns all orders
If CUSTOMER: returns only their own orders




🖥️ Frontend Admin/Customer Panel
Overview
This React + Redux Toolkit application provides a simple e-commerce-like interface with:

Product management (admin only)
Order viewing (admin only)
Product browsing and purchasing (customers)
Auth-based routing logic


Features
🔐 Authentication

Users can register and login
After login, the token is stored in localStorage and used for authenticated requests
Based on the user role:

Admins are redirected to the admin dashboard
Customers are redirected to the shop page




Note: Routing redirection based on roles is implemented.


📦 Orders (Admin)

Admins can view all orders via /orders
Each order includes:

Order ID
Customer email
Date
List of purchased products and quantities



The system uses the following endpoint:
httpGET /orders
Authorization: Bearer <token>

🛍️ Product Management (Admin)
Admins can:

Add new products
Update product details
Delete products

Uses Redux for fetching and managing product state.

🧾 Shopping Cart (Customer)
Customers can:

Add products to the cart
View cart contents and total
Place an order

Order creation sends:
json{
  "items": [
    {
      "productId": "<id>",
      "quantity": <number>
    }
  ]
}
To:
httpPOST /orders

🔔 Known Limitations
❗ Logout functionality is not implemented yet
❗ Styling is minimal or missing due to tight time constraints

🧪 Future Improvements

Add a LogoutButton component that clears auth state and redirects to login
Style the UI using TailwindCSS or Material UI
Add role-protected routes via a route guard HOC or component
