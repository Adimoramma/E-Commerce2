# Frontend Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables (Optional)

The API base URL is configured in `src/api/api.js`. By default:
```
API_BASE_URL = http://localhost:5000/api
```

To change it, edit `src/api/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal)

### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── api.js              # API client and endpoints
│   ├── store/
│   │   ├── authSlice.js        # Redux auth state
│   │   ├── cartSlice.js        # Redux cart state
│   │   └── store.js            # Redux store configuration
│   ├── Context/
│   │   └── ShopContext.jsx     # Shop context (products, categories)
│   ├── Components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Items/
│   │   ├── Hero/
│   │   ├── Popular/
│   │   ├── Offers/
│   │   ├── NewCollections/
│   │   ├── ProductDisplay/
│   │   ├── DescriptionBox/
│   │   ├── Breadcrum/
│   │   ├── RelatedProducts/
│   │   ├── NewsLetter/
│   │   └── Admin/
│   ├── Pages/
│   │   ├── Shop.jsx
│   │   ├── ShopCategory.jsx
│   │   ├── Product.jsx
│   │   ├── Cart.jsx
│   │   ├── LoginSignup.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── MyOrders.jsx
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminCategories.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   └── AdminAnalytics.jsx
│   │   └── CSS/
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── index.html
```

## Features Overview

### User Features
- **Home Page**: Browse featured products
- **Shop**: View all products with filtering and sorting
- **Categories**: Filter products by category
- **Search**: Find products by name or description
- **Product Details**: View product info, images, and reviews
- **Cart**: Add/remove items, update quantities
- **Checkout**: Shipping address and payment method
- **Orders**: View order history and track status
- **Authentication**: Register and login

### Admin Features
- **Dashboard**: Overview of stats and analytics
- **Products**: Create, edit, delete products
- **Categories**: Manage product categories
- **Orders**: View and update order status
- **Analytics**: View sales and revenue reports

## State Management

### Redux Store
```javascript
// Auth State
auth: {
  user: { id, name, email, role },
  token: "jwt_token",
  loading: false,
  error: null
}

// Cart State
cart: {
  items: [{ _id, name, price, quantity, image }],
  loading: false,
  error: null
}
```

### Context API
```javascript
// ShopContext
{
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: null,
  searchQuery: "",
  sortType: "newest",
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 12
}
```

## User Flow

### Registration & Login
1. User clicks "Sign Up" at `/login`
2. Fills in name, email, password
3. Token is stored in localStorage
4. User is redirected to home page

### Shopping
1. User browses products on home page
2. Can filter by category or search
3. Clicks product to view details
4. Adds product to cart
5. Views cart at `/cart`
6. Proceeds to checkout at `/checkout`

### Checkout
1. Shipping address is pre-filled from profile
2. User selects payment method
3. Review order summary
4. Click "Complete Purchase"
5. Order is created, redirected to confirmation

### Admin Panel
1. Admin logs in (role must be 'admin')
2. Navigates to `/admin`
3. Can manage products, categories, and orders
4. View analytics and sales data

## API Integration

All API calls go through `src/api/api.js`:

```javascript
// Import API
import { productAPI, authAPI, orderAPI } from '../api/api';

// Use in component
const response = await productAPI.getAllProducts({ limit: 12 });
```

### Authentication
- JWT token stored in localStorage
- Automatically added to all API requests
- Token expires after 7 days (configurable)

## Styling

- CSS files in `src/pages/CSS/`
- Component-level CSS files alongside JSX
- Global styles in `src/index.css`
- Responsive design with media queries

## Common Issues & Solutions

### API Connection Error
- Check if backend is running on `http://localhost:5000`
- Verify API_BASE_URL in `src/api/api.js`
- Check CORS headers in backend

### JWT Token Expired
- User needs to log in again
- Token is automatically removed from localStorage
- Redirect to login page on 401 error

### Products Not Loading
- Ensure MongoDB is running
- Check if backend has product data
- Verify API endpoint in `src/api/api.js`

### Cart Data Lost on Refresh
- Cart is stored in Redux and localStorage
- Check if localStorage is enabled in browser
- Clear browser cache and try again

### Image Not Loading
- Check image URL format
- Ensure image server is accessible
- Verify file path in product data

## Development Tips

1. Use Redux DevTools for state debugging
2. Use Network tab in Browser DevTools for API debugging
3. Enable ES6 in browser console for testing
4. Use React DevTools extension for component inspection

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **AWS S3 + CloudFront**: Upload `dist/` to S3
- **Docker**: Create Dockerfile for containerization

### Environment Variables for Production
Update `src/api/api.js` with production backend URL:
```javascript
const API_BASE_URL = 'https://api.yourdomain.com/api';
```

## Performance Optimization

1. Code splitting with React Router
2. Image optimization
3. Lazy loading of components
4. Caching API responses
5. Minification and compression

## Next Steps

1. Ensure backend is running
2. Create test user accounts
3. Add products and categories via admin
4. Test shopping flow
5. Deploy to production

For more information, refer to the main README.md file.


The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
