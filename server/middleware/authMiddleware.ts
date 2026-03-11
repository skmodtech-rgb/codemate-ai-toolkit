import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const secret = process.env.JWT_SECRET || 'toolmate_ai_secret_key_2026';
            const decoded: any = jwt.verify(token, secret);

            // Bypass User lookup for demo purposes if needed, or make it robust
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user && decoded.id === 'mock_id_123') {
                req.user = { _id: 'mock_id_123', name: 'Demo User', email: 'demo@toolmate.ai' };
            }

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error: any) {
            console.error('Auth Middleware Error:', error.message);
            res.status(401).json({ message: 'Session expired, please login again' });
            return;
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};
