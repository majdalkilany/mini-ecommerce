# 🛠️ Mini E-Commerce API Documentation

This API supports a basic e-commerce backend with authentication, product management, and order handling.

## 📦 Setup Instructions

Run the project with:
```bash
yarn install
yarn start:dev
```

To seed an initial admin user:
```bash
yarn seed:admin
```

---

## 📁 Auth

### 🔐 Register
- **Endpoint**: `POST /auth/register`
- **Body**:
  ```json
  {
    "email": "majd@example.com",
    "password": "password123",
    "name": "Majd"
  }
  ```
- **Response**: `201 Created`

---

### 🔑 Login
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "majd@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns a JWT token

---

## 👤 Users

### 🙋‍♂️ Get Current User
- **Endpoint**: `GET /users/me`
- **Headers**:
  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**:
  ```json
  {
    "id": "uuid",
    "email": "majd@example.com",
    "name": "Majd",
    "role": "ADMIN"
  }
  ```

---

## 🛒 Products

### ➕ Create Product (Admin Only)
- **Endpoint**: `POST /products`
- **Headers**: Bearer token (admin required)
- **Body**:
  ```json
  {
    "name": "PlayStation 5",
    "price": 499.99,
    "stock": 15
  }
  ```

### 📃 Get All Products
- **Endpoint**: `GET /products`
- **Response**: List of all available products


### ✏️ Update Product (Admin Only)
- **Endpoint**: `Put /products/:id`
- **Headers**: Bearer token (admin required)
- **Body**:
  ```json
  {
    "name": "Updated Product",
    "price": 499.99,
    "stock": 20
  }
  ```
### ✏️ Delete Product (Admin Only)
- **Endpoint**: `Delete /products/:id`
- **Headers**: Bearer token (admin required)
  ```


---

## 📦 Orders

### 📝 Create Order
- **Endpoint**: `POST /orders`
- **Headers**: Bearer token (customer required)
- **Body**:
  ```json
  {
    "items": [
      {
        "productId": "uuid-of-product",
        "quantity": 2
      }
    ]
  }
  ```

### 📑 Get Orders
- **Endpoint**: `GET /orders`
- **Headers**: Bearer token
- **Behavior**:
  - If **ADMIN**: returns all orders
  - If **CUSTOMER**: returns only their own orders