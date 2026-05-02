import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import cityRoutes from './routes/city.routes';
import listingRoutes from './routes/listing.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/listings', listingRoutes);

export default app;
