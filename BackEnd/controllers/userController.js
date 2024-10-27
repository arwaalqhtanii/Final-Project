import { log } from 'console';
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

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Your 64-character hex string
const IV_LENGTH = 16; // For AES, this is typically 16 bytes


// console.log("Encryption Key:", ENCRYPTION_KEY);
// console.log("Key length:", ENCRYPTION_KEY.length); // Should be 32
// console.log("IV length:", IV_LENGTH); // Should be 16

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv); // Use the buffer directly
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Return IV and encrypted data
}


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



function decrypt(encryptedText) {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts.shift(), 'hex'); // Get the IV from the string
    const encryptedTextBuffer = Buffer.from(parts.join(':'), 'hex'); // Get the encrypted text

    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedTextBuffer, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; // Return the decrypted text
}



//Get-all-User
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users

        const userDetails = users.map(user => {
            let decryptedIDNumber = null; // Initialize decryptedIDNumber as null

            // Attempt to decrypt the IDNumber and handle potential errors
            try {
                decryptedIDNumber = decrypt(user.idNumber); // Decrypt IDNumber
            } catch (error) {
                console.error('Decryption failed for IDNumber:', user.idNumber, error);
                decryptedIDNumber = 'Invalid ID Format'; // Fallback message if decryption fails
            }

            return {
                userId: user._id,
                IDNumber: decryptedIDNumber, // Show decrypted IDNumber or error message
                email: user.email,           // Include email
                encryption: user.idNumber     // Original encrypted IDNumber
            };
        });

        res.status(200).json(userDetails); // Send users in the response
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};



const JWT_SECRET = process.env.JWT_SECRET; // Use a secure key, store it safely

//post-login-User
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Validate input
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required' });
//         }



//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Check if the password is correct
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         if (user.isSuspended) {
//             return res.status(403).json({ message: 'Account is temporarily suspended. Please try again later.' });
//         }

//         // Decrypt the idNumber
//         let decryptedIdNumber;
//         try {
//             decryptedIdNumber = decrypt(user.idNumber); // Attempt to decrypt
//         } catch (error) {
//             // console.error('Decryption error:', error);
//             return res.status(500).json({ message: 'Failed to decrypt ID number' });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user._id, email: user.email }, // Payload
//             JWT_SECRET, // Secret key
//             { expiresIn: '1h' } // Expiration time
//         );

//         // Respond with user data and token
//         const { password: _, ...userData } = user.toObject();
//         res.status(200).json({
//             message: 'Login successful',
//             user: userData,
//             idNumber: decryptedIdNumber,
//             token // Include the generated token
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate request data
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log("User suspension status:", user.isSuspended);
console.log("user.suspensionEnd "+user.suspensionEnd );
        // Check if there is a suspensionEnd and if it has passed
        const now = Date.now();
        if (user.isSuspended) {
            if (user.suspensionEnd && user.suspensionEnd > now) {
                return res.status(403).json({ message: 'Your account is temporarily suspended. Please try again later.' });
            }

            // Unsuspend the user if the suspension period has passed
            await User.findByIdAndUpdate(user._id, {
                isSuspended: false,
                suspensionEnd: null,
            });
        }

        // Generate a token for the user
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        const { password: _, ...userData } = user.toObject(); // Omit the password from the response
        res.status(200).json({
            message: 'Login successful',
            user: userData,
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to handle approval and potential suspension
export const approveNotification = async (req, res) => {
    // ... your existing approveNotification logic ...

    // After checking for recent approvals, if two approvals happen within the time frame
    if (recentApprovals.length >= 2) {
        sender.isSuspended = true;
        sender.suspensionEnd = Date.now() + 60000; // Set suspension for 1 minute (60000 milliseconds)
        console.log('User suspended:', senderId); // Log the suspension
    }

    await sender.save();

    res.status(200).json({
        message: 'Notification approved and new ticket created',
        notification,
        newTicket
    });
};





//delete user by id 
export const deleteuserbyId =async (req, res) => {
    const { userId } = req.params; // Get user ID from request parameters

    try {
        // Find the user and delete
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


//get user info 
export const getUserInfo = async (req, res) => {
    try {
        // Access the user ID from req.user
        const userId = req.user._id; // Ensure this matches how you structured req.user in the middleware
        const user = await User.findById(userId).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


//update user info
export const updateUserInfo = async (req, res) => {
    const { username, email } = req.body; // Get new username and email from the request body

    try {
        const userId = req.user._id; // Get user ID from the authenticated user

        // Create an update object
        const updates = {};
        if (username) updates.Username = username; // Add username to updates if provided
        if (email) updates.email = email; // Add email to updates if provided

        // Check for existing email if provided
        if (email) {
            const existingEmailUser = await User.findOne({ email });
            if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
                return res.status(400).json({ message: 'Email is already in use by another user.' });
            }
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({
            message: 'User information updated successfully.',
            user: {
                idNumber: updatedUser.idNumber,
                Username: updatedUser.Username,
                email: updatedUser.email,
            },
        });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
