import jwt from 'jsonwebtoken';

const generateToken = (id: any) => {
    // For demo purposes, use a fallback secret if not in env
    const secret = process.env.JWT_SECRET || 'toolmate_ai_secret_key_2026';
    return jwt.sign({ id }, secret, {
        expiresIn: '30d',
    });
};

export default generateToken;
