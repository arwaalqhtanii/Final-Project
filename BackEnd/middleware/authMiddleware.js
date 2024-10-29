import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

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


        if (!user) {
            return res.status(401).json({ message: 'Access denied: User not found' });
        }

        req.user = {
            _id: user._id,
            IDNumber: user.idNumber, 
            email: user.email,
        };
        
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(400).json({ message: 'Invalid token' });
    }
};

