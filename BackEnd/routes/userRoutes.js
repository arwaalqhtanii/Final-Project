import express from 'express';
import { registerUser ,getAllUsers,loginUser} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Get all users route
router.get('/users', getAllUsers);

// Login route
router.post('/login', loginUser);


// Export the router
export default router;
