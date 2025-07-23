// npm install express dotenv mongoose cors
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import messageRoutes from './routes/messagesRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Prijungia žinučių maršrutą prie /api/messages
app.use('/api/messages', messageRoutes);

mongoose.connect(process.env.dbURL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));