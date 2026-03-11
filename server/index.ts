import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import toolRoutes from './routes/toolRoutes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'],
    credentials: true
}));
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for easier tool integration
}));
app.use(morgan('dev'));

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        // don't exit since it's just placeholder if MONGODB_URI is YOUR_MONGO_DB_URL
        if (process.env.MONGODB_URI !== 'YOUR_MONGO_DB_URL') {
            process.exit(1);
        }
    }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);

// Root path
app.get('/', (req: Request, res: Response) => {
    res.send('ToolMate AI Server Running...');
});

// Error handling middleware MUST be LAST
app.use(errorHandler);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

