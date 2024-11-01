import express from 'express';
import dotenv from 'dotenv';
import personRoutes from './routes/personRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/persons', personRoutes);

export default app;