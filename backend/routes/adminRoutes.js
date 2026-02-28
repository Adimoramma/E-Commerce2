import express from 'express';
import { getDashboardStats, getSalesData, getRevenueStats, getLowStockProducts } from '../controllers/adminController.js';
import { adminProtect } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard/stats', adminProtect, getDashboardStats);
router.get('/sales/data', adminProtect, getSalesData);
router.get('/revenue/stats', adminProtect, getRevenueStats);
router.get('/products/low-stock', adminProtect, getLowStockProducts);

export default router;
