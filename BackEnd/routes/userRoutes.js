import express from 'express';
import { registerUser ,getAllUsers,loginUser, deleteuserbyId,getUserInfo,updateUserInfo,forgetPassword} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Get all users route
router.get('/users', getAllUsers);

// Login route
router.post('/login', loginUser);

//delete user by id 
router.delete('/users/:userId', deleteuserbyId);

// Route to get user information
router.get('/userinfo', authenticateToken, getUserInfo);

//update user info
router.put('/update', authenticateToken, updateUserInfo);

//forgetPassword
router.post('/forgetPassword', forgetPassword);

export default router;
