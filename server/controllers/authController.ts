import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';
import { generateVerificationToken, sendVerificationEmail } from '../utils/emailService';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Mock login fallback for demo - always allow demo account
        if (email === 'demo@toolmate.ai' && password === 'demo123') {
            return res.json({
                _id: 'mock_id_123',
                name: 'Demo User',
                email: 'demo@toolmate.ai',
                isEmailVerified: true,
                token: generateToken('mock_id_123'),
            });
        }

        const user: any = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isEmailVerified: true,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

// registration-related functions removed

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: any, res: Response) => {
    try {
        if (process.env.MONGODB_URI === 'YOUR_MONGO_DB_URL' || !process.env.MONGODB_URI) {
            return res.json({
                _id: 'mock_id_123',
                name: 'Demo User',
                email: 'demo@toolmate.ai',
                isEmailVerified: true,
            });
        }

        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isEmailVerified: user.isEmailVerified,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error: any) {
        res.status(404).json({ message: error.message || 'Error occurred' });
    }
};

// @desc    Update user profile (name)
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req: any, res: Response) => {
    try {
        if (process.env.MONGODB_URI === 'YOUR_MONGO_DB_URL' || !process.env.MONGODB_URI) {
            return res.json({
                _id: 'mock_id_123',
                name: req.body.name || 'Demo User',
                email: 'demo@toolmate.ai',
                isEmailVerified: true,
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isEmailVerified: updatedUser.isEmailVerified,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'Update failed' });
    }
};

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req: any, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (process.env.MONGODB_URI === 'YOUR_MONGO_DB_URL' || !process.env.MONGODB_URI) {
            return res.json({ message: 'Password updated successfully' });
        }

        const user: any = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'Password change failed' });
    }
};
