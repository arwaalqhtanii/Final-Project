import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; 
import nodemailer from 'nodemailer';



dotenv.config(); 

const isHex = /^[0-9a-fA-F]+$/.test(process.env.ENCRYPTION_KEY);
if (!isHex) {
    throw new Error("ENCRYPTION_KEY must be a valid hexadecimal string.");
}

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); 
const IV_LENGTH = 16; 



function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv); 
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; 
}



//post new User
export const registerUser = async (req, res) => {
    const { idNumber, email, password } = req.body;

    try {
      
        if (!idNumber || idNumber.length !== 9 || isNaN(idNumber)) {
            return res.status(400).json({ message: 'ID number must be exactly 9 digits' });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const existingIdNumber = await User.findOne({ idNumber });
        if (existingIdNumber) {
            return res.status(400).json({ message: 'ID number already in use' });
        }

        const encryptedIdNumber = encrypt(idNumber); 
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({ idNumber: encryptedIdNumber, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
};



function decrypt(encryptedText) {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts.shift(), 'hex'); 
    const encryptedTextBuffer = Buffer.from(parts.join(':'), 'hex'); 

    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedTextBuffer, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; 
}



//Get-all-User
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 

        const userDetails = users.map(user => {
            let decryptedIDNumber = null; 
            try {
                decryptedIDNumber = decrypt(user.idNumber); 
            } catch (error) {
                console.error('Decryption failed for IDNumber:', user.idNumber, error);
                decryptedIDNumber = 'Invalid ID Format'; 
            }

            return {
                userId: user._id,
                IDNumber: decryptedIDNumber, 
                email: user.email,           
                encryption: user.idNumber     
            };
        });

        res.status(200).json(userDetails); 
    } catch (error) {
        console.error('Error fetching users:', error); 
        res.status(500).json({ message: 'Server error' });
    }
};



const JWT_SECRET = process.env.JWT_SECRET; 

//post-login-User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log("User suspension status:", user.isSuspended);
        console.log("user.suspensionEnd "+user.suspensionEnd );
        const now = Date.now();
        if (user.isSuspended) {
            if (user.suspensionEnd && user.suspensionEnd > now) {
                return res.status(403).json({ message: 'Your account is temporarily suspended. Please try again later.' });
            }

            await User.findByIdAndUpdate(user._id, {
                isSuspended: false,
                suspensionEnd: null,
            });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        const { password: _, ...userData } = user.toObject(); 
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

    if (recentApprovals.length >= 2) {
        sender.isSuspended = true;
        sender.suspensionEnd = Date.now() + 60000; 
        console.log('User suspended:', senderId); 
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
    const { userId } = req.params; 

    try {
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
        const userId = req.user._id; 
        const user = await User.findById(userId).select('-password'); 

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
    const { username, email ,password } = req.body; 

    try {
        const userId = req.user._id; 

        const updates = {};
        if (username) updates.Username = username; 
        if (email) updates.email = email; 
        if(password) updates.password= await bcrypt.hash(password, 10);
        
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

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
            { new: true } 
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
                password:updatedUser.password,
            },
        });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

//forgrt password
export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a temporary code for reset passowerd
    const tempPassword = crypto.randomBytes(4).toString('hex');
    user.password = await bcrypt.hash(tempPassword, 10);
    await user.save();

    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Pass:', process.env.EMAIL_PASS);

    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Send the email
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'WhiteTik Reset Password',
        text: `Your temporary password is: ${tempPassword}\nPlease log in and change your password immediately.`,
      },
      (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email' });
        }
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Temporary password sent to your email' });
      }
    );
  } catch (error) {
    console.error('Error in forgetPassword function:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

