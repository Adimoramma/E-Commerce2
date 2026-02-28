# E-Commerce Fullstack Application

A complete fullstack e-commerce application with user authentication, product management, shopping cart, order processing, and admin dashboard.

## Features

### User Features
- User registration and login with JWT authentication
- Browse products with filtering and sorting
- Search products by name or description
- Add products to shopping cart
- Place orders with shipping address
- View order history and tracking
- Product reviews and ratings

### Admin Features
- Dashboard with analytics and statistics
- Product management (Create, Read, Update, Delete)
- Category management
- Order management with status tracking
- Sales analytics and revenue reports
- Low stock inventory alerts

## Tech Stack

### Frontend
- React 19
- Redux Toolkit for state management
- React Router for navigation
- Axios for API calls
- Vite as build tool
- CSS3 for styling

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing
- Multer for file uploads

## Project Structure

```
E-Commerce2/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js (API endpoints)
│   │   ├── store/ (Redux store)
│   │   ├── Context/ (ShopContext)
│   │   ├── Components/
│   │   ├── Pages/
│   │   │   ├── Admin/ (Admin pages)
│   │   │   └── CSS/ (Stylesheets)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── models/ (Database schemas)
    ├── controllers/ (Business logic)
    ├── routes/ (API routes)
    ├── middleware/ (JWT auth)
    ├── server.js
    └── package.json
```

## Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and other configurations:
```
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

5. Start MongoDB service (if local):
```bash
# On Windows
mongod

# On Mac/Linux
sudo mongod
```

6. Run the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/new` - Get new products
- `POST /api/products/:id/reviews` - Add product review

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/remove` - Remove from cart
- `PUT /api/cart/update` - Update cart item
- `POST /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `POST /api/orders/:id/cancel` - Cancel order

### Admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/sales/data` - Sales data
- `GET /api/admin/revenue/stats` - Revenue statistics
- `GET /api/admin/products/low-stock` - Low stock products

## Usage

### For Users
1. Register or login at `/login`
2. Browse products on the home page
3. Filter by category or search for products
4. Click on a product to view details
5. Add products to cart
6. Proceed to checkout
7. Complete purchase with shipping details
8. View order confirmation and track orders in "My Orders"

### For Admins
1. Login with admin credentials
2. Navigate to `/admin` dashboard
3. Manage products, categories, and orders
4. View analytics and sales reports
5. Update order statuses and track shipments

## Database Schemas

### User
- name, email, password, phone
- address (street, city, state, zipCode, country)
- role (user/admin)

### Product
- name, description, price, originalPrice
- category, stock, image, images
- rating, reviews, sizes, colors, isNew

### Order
- user, items, shippingAddress
- paymentMethod, paymentStatus, orderStatus
- subtotal, tax, shippingCost, total
- trackingNumber, notes

### Category
- name, description, image

### Cart
- user, items (product, quantity, price)

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Admin routes require `role: 'admin'`
- Protected routes check for valid token in Authorization header

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Email notifications
- Product variants (sizes, colors)
- Wishlist feature
- Advanced analytics
- Discount codes
- Multiple payment methods
- Real-time notifications

## License

This project is open source and available under the MIT License.

## Support

For support, email support@ecommerce.com or open an issue on GitHub.
