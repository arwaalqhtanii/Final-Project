import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure the import is correct

export const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await User.findById(verified.id); // Find user by ID in the token

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attach user data to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};
