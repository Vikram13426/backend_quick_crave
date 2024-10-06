This project is an  Online multi Vendor Food Restaurent application built using Node.js, Express, and MongoDB.
The application allows vendors to register, login, and manage products associated with their firms.
The backend also supports CRUD operations on products, file uploads for product images, and authentication via JSON Web Tokens (JWT).

 Features

- Vendor Registration & Login
  - Vendors can register with a username, email, and password.
  - Login using JWT for authentication.
  
- Product Management
  - Create, Read, Update, Delete (CRUD) operations for products.
  - Products are linked to specific firms and vendors.
  - File upload functionality for product images using `multer`.
  
- Firm Management
  - Firms can be created and associated with products.
  - Each product is linked to a specific firm.

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads(for images)
- Bcrypt.js for password hashing
- dotenv for environment variables

Getting Started

 Prerequisites

Make sure you have the following installed:

- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   ```

2. Install dependencies:

   ```bash
   cd your-repository-name
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of your project and add the following variables:

   ```bash
   PORT=4000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Your server should now be running at `http://localhost:4000`.

### API Endpoints

- Vendor Routes
  - `POST /register`: Register a new vendor.
  - `POST /login`: Vendor login.

- Product Routes
  - `POST /product/add-product/:firmId`: Add a product to a firm.
  - `GET /product/all-products`: Get all products.
  - `GET /product/single-product/:id`: Get a product by ID.
  - `PUT /product/update-product/:id`: Update a product by ID.
  - `DELETE /product/delete-product/:id`: Delete a product by ID.

- Firm Routes
  - `GET /firm/all-firms`: Get all firms.

### Project Structure

```
.
├── controllers
│   ├── ProductController.js
│   └── VendorController.js
├── models
│   ├── Product.js
│   ├── Vendor.js
│   └── Firm.js
├── routes
│   ├── productRoutes.js
│   └── vendorRoutes.js
├── uploads
│   └── (Uploaded product images will be stored here)
├── .env
├── index.js
└── README.md
```

### Future Improvements

- Add role-based authentication and authorization.
- Implement search and filter functionalities for products.
- Improve error handling and input validation.


