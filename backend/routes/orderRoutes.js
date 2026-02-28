import express from 'express';
import { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, cancelOrder } from '../controllers/orderController.js';
import { protect, adminProtect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.get('/', adminProtect, getAllOrders);
router.put('/:id/status', adminProtect, updateOrderStatus);
router.post('/:id/cancel', protect, cancelOrder);

export default router;
