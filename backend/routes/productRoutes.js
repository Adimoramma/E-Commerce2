import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getNewProducts,
  getProductsByCategory,
} from '../controllers/productController.js';
import { protect, adminProtect } from '../middleware/auth.js';

const router = express.Router();

router.get('/new', getNewProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, addReview);
router.get('/category/:categoryId', getProductsByCategory);
router.post('/', adminProtect, createProduct);
router.put('/:id', adminProtect, updateProduct);
router.delete('/:id', adminProtect, deleteProduct);

export default router;
