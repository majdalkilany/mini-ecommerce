make this as markdoun 
# Frontend Admin/Customer Panel
## Overview
This React + Redux Toolkit application provides a simple e-commerce-like interface with:
- Product management (admin only)
- Order viewing (admin only)
- Product browsing and purchasing (customers)
- Auth-based routing logic
---
## Features
### 🔐 Authentication
- Users can register and login.
- After login, the token is stored in localStorage and used for authenticated requests.
- Based on the user role:
  - Admins are redirected to the admin dashboard.
  - Customers are redirected to the shop page.
> Note: Routing redirection based on roles is implemented.
---
### 📦 Orders (Admin)
- Admins can view all orders via /orders.
- Each order includes:
  - Order ID
  - Customer email
  - Date
  - List of purchased products and quantities
The system uses the following endpoint:
```http
GET /orders
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
json
Copy
Edit
{
  "items": [
    { "productId": "<id>", "quantity": <number> }
  ]
}
To:
http
Copy
Edit
POST /orders
🔔 Known Limitations
❗ Logout functionality is not implemented yet.
❗ Styling is minimal or missing due to tight time constraints.
🧪 Future Improvements
Add a LogoutButton component that clears auth state and redirects to login.
Style the UI using TailwindCSS or Material UI.
Add role-protected routes via a route guard HOC or component.

