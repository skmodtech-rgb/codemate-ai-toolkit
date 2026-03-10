import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // since we might not have a working mongo instance initially for the demo, 
        // we can add a fallback mock login to allow UI to show
        if (process.env.MONGODB_URI === 'YOUR_MONGO_DB_URL' || !process.env.MONGODB_URI) {
            if (email === 'demo@toolmate.ai' && password === 'demo123') {
                return res.json({
                    _id: 'mock_id_123',
                    name: 'Demo User',
                    email: 'demo@toolmate.ai',
                    token: generateToken('mock_id_123'),
                });
            }
        }

        const user: any = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error: any) {
        res.status(401).json({ message: error.message || 'Error occurred' });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Mock DB implementation for seamless demo
        if (process.env.MONGODB_URI === 'YOUR_MONGO_DB_URL' || !process.env.MONGODB_URI) {
             return res.status(201).json({
                _id: 'mock_new_id',
                name,
                email,
                token: generateToken('mock_new_id'),
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'Error occurred' });
    }
};

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
            });
        }

        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch(error: any) {
        res.status(404).json({ message: error.message || 'Error occurred' });
    }
};
