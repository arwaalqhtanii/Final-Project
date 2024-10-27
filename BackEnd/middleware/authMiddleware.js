import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust the path to your User model

export const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token || !/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/.test(req.headers['authorization'])) {
        return res.status(401).json({ message: 'Access denied: No valid token provided' });
    }


    if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        // console.log(user); // Check if IDNumber is present


        if (!user) {
            return res.status(401).json({ message: 'Access denied: User not found' });
        }

        // Pass user data to request
        req.user = {
            _id: user._id,
            IDNumber: user.idNumber, // Keep this as IDNumber
            email: user.email,
        };
        // console.log('Verified user ID:', verified.id);
        // console.log('Fetched user:', user);
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(400).json({ message: 'Invalid token' });
    }
};

