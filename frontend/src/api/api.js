import axios from 'axios';

// on Vercel set VITE_API_URL (or VITE_API_BASE_URL) in the environment variables to the Render backend URL
// Vite exposes env vars through import.meta.env
// fallback for local dev or when env var is missing:
const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'https://e-commerce2backend-sbh7.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getAllUsers: () => api.get('/users'),
  deleteUser: (userId) => api.delete(`/users/${userId}`),
};

// Product endpoints
export const productAPI = {
  getAllProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  addReview: (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData),
  getNewProducts: () => api.get('/products/new'),
  getProductsByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
};

// Cart endpoints
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (cartData) => api.post('/cart/add', cartData),
  removeFromCart: (cartData) => api.post('/cart/remove', cartData),
  updateCartItem: (cartData) => api.put('/cart/update', cartData),
  clearCart: () => api.post('/cart/clear'),
};

// Order endpoints
export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/my-orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getAllOrders: (params) => api.get('/orders', { params }),
  updateOrderStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
  cancelOrder: (id) => api.post(`/orders/${id}/cancel`),
};

// Category endpoints
export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
  getCategoryById: (id) => api.get(`/categories/${id}`),
  createCategory: (categoryData) => api.post('/categories', categoryData),
  updateCategory: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

// Admin endpoints
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getSalesData: (period) => api.get('/admin/sales/data', { params: { period } }),
  getRevenueStats: () => api.get('/admin/revenue/stats'),
  getLowStockProducts: () => api.get('/admin/products/low-stock'),
};

export default api;
