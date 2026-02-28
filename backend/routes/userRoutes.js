import express from 'express';
import { register, login, getProfile, updateProfile, getAllUsers, deleteUser } from '../controllers/userController.js';
import { protect, adminProtect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', adminProtect, getAllUsers);
router.delete('/:id', adminProtect, deleteUser);

export default router;
