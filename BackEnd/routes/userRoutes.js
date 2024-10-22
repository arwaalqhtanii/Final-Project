import express from 'express';
import { registerUser ,getAllUsers,loginUser, deleteuserbyId} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Check the path and export name

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Get all users route
router.get('/users', getAllUsers);

// Login route
router.post('/login', loginUser);

//delete user by id 
router.delete('/users/:userId', deleteuserbyId);

// Export the router
export default router;
