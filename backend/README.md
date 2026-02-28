# Backend Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/ecommerce
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Stripe (Optional - for payment processing)
STRIPE_API_KEY=sk_test_your_stripe_key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 3. Start MongoDB

#### Local MongoDB:
```bash
# Windows
mongod

# Mac/Linux
sudo mongod
```

#### MongoDB Atlas (Cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string and replace in MONGO_URI
- Make sure IP is whitelisted

### 4. Run Backend Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Project Structure

```
backend/
├── controllers/
│   ├── adminController.js    # Admin analytics
│   ├── cartController.js     # Cart operations
│   ├── categoryController.js # Category management
│   ├── orderController.js    # Order operations
│   ├── productController.js  # Product management
│   └── userController.js     # User auth & profile
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Category.js
│   └── Cart.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── cartRoutes.js
│   ├── categoryRoutes.js
│   └── adminRoutes.js
├── middleware/
│   └── auth.js              # JWT authentication
├── uploads/                 # Uploaded files
├── server.js               # Main server file
├── package.json
└── .env                    # Environment variables
```

## API Testing

You can test API endpoints using:
- Postman: https://www.postman.com/
- Thunder Client (VS Code Extension)
- cURL commands

### Example: User Registration

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Example: Get All Products

```bash
curl http://localhost:5000/api/products?limit=12&page=1
```

### Example: Login

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Database Initialization

To populate initial data, you can:

1. Create categories via admin API
2. Create products via admin API
3. Or use MongoDB Compass to insert sample data

### Sample Category Creation

```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Electronics",
    "description": "Electronic devices and gadgets"
  }'
```

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB service is running
- Verify MONGO_URI in .env file
- Check MongoDB credentials if using Atlas
- Ensure IP is whitelisted in Atlas

### JWT Token Error
- Make sure JWT_SECRET is set in .env
- Use Bearer token format in Authorization header
- Check token expiration

### CORS Error
- Ensure backend is running on correct port
- Check frontend API_BASE_URL matches backend URL
- CORS is enabled in server.js

### Port Already in Use
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

## Performance Tips

1. Add indexes to frequently queried fields in MongoDB
2. Implement pagination for large datasets
3. Use caching for product data
4. Optimize database queries with proper projections
5. Implement rate limiting for API endpoints

## Security Best Practices

1. Keep sensitive data in .env file
2. Never commit .env to version control
3. Use strong JWT_SECRET
4. Validate all user inputs
5. Use HTTPS in production
6. Implement rate limiting
7. Sanitize database inputs
8. Keep dependencies updated

## Next Steps

1. Set up frontend with the provided configuration
2. Create admin user accounts
3. Seed initial product and category data
4. Test all API endpoints
5. Deploy to production

For more information, refer to the main README.md file in the root directory.
