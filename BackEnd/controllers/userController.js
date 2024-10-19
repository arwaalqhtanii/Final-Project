import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken


dotenv.config(); // Load environment variables from .env file

const isHex = /^[0-9a-fA-F]+$/.test(process.env.ENCRYPTION_KEY);
if (!isHex) {
    throw new Error("ENCRYPTION_KEY must be a valid hexadecimal string.");
}
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Use a strong key stored in your environment variables
const IV_LENGTH = 16; // For AES, this is typically 16 bytes

const encrypt = (text) => {
    const iv = crypto.randomBytes(16); // Generate a random IV
    const keyBuffer = Buffer.from(ENCRYPTION_KEY.trim(), 'hex');

    let cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return IV and encrypted text as a string
    return `${iv.toString('hex')}:${encrypted}`;
};

// console.log("Key length:", Buffer.from(ENCRYPTION_KEY, 'hex').length); // Should be 32
// console.log("IV length:", IV_LENGTH); // Should be 16

//post new User
export const registerUser = async (req, res) => {
    const { idNumber, email, password } = req.body;

    try {
        // console.log("Encryption Key:", ENCRYPTION_KEY);
        // console.log("Key length:", Buffer.from(ENCRYPTION_KEY, 'hex').length); // Check key length


        // Validate idNumber
        if (!idNumber || idNumber.length !== 9 || isNaN(idNumber)) {
            return res.status(400).json({ message: 'ID number must be exactly 9 digits' });
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate password
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Check if the idNumber already exists
        const existingIdNumber = await User.findOne({ idNumber });
        if (existingIdNumber) {
            return res.status(400).json({ message: 'ID number already in use' });
        }

        // Hash the idNumber and password
        const encryptedIdNumber = encrypt(idNumber); // Encrypt idNumber
        const hashedPassword = await bcrypt.hash(password, 10);

        // console.log('Encrypted ID Number:', encryptedIdNumber);

        // Create a new user
        const newUser = new User({ idNumber: encryptedIdNumber, email, password: hashedPassword });
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

//Get-all-User
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users); // Send users in the response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

const decrypt = (text) => {
    // console.log('decripted ID Number:', text);

    const parts = text.split(':');
    if (parts.length !== 2) {
        throw new Error('Invalid encrypted data format');
    }

    const [ivHex, encryptedText] = parts;

    // Ensure IV is a valid hex string
    const iv = Buffer.from(ivHex, 'hex');
    const keyBuffer = Buffer.from(ENCRYPTION_KEY.trim(), 'hex');

    let decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};

const JWT_SECRET = process.env.JWT_SECRET; // Use a secure key, store it safely

//post-login-User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Decrypt the idNumber
        let decryptedIdNumber;
        try {
            decryptedIdNumber = decrypt(user.idNumber); // Attempt to decrypt
        } catch (error) {
            // console.error('Decryption error:', error);
            return res.status(500).json({ message: 'Failed to decrypt ID number' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Expiration time
        );

        // Respond with user data and token
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({
            message: 'Login successful',
            user: userData,
            idNumber: decryptedIdNumber,
            token // Include the generated token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};