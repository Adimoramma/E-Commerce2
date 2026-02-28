import express from 'express';
import multer from 'multer';
import { uploadImage, getImagesByProduct } from '../controllers/imageController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// admin only
router.post('/upload', protect, admin, upload.single('image'), uploadImage);
router.get('/:productId', getImagesByProduct);

export default router;
