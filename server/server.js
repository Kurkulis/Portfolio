// npm install express dotenv mongoose cors path-to-regexp express-rate-limit nodemailer
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import messageRoutes from './routes/messagesRoutes.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(cors({
  // origin: ['http://localhost:5173','http://kurkulis.lt'],
  origin: '*', // Allow all origins for development; restrict in production
  methods: ['POST']
}));

app.use(express.json());

// Spam protection
const limiter = rateLimit({
  windowMs: 60 * 1000,  
  max: 2,               
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/messages', limiter, messageRoutes);

// Add connection options for better error handling
const mongoOptions = {
  useNewUrlParser: true,  // Use the new URL parser
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
  serverSelectionTimeoutMS: 5000,  // Timeout after 5s if the server is not available
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

mongoose.connect(process.env.MONGO_URL, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Please check if MongoDB is running or update your connection string');
    process.exit(1);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});