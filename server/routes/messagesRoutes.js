import express from 'express';
import Message from '../models/messagesModels.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;
        const newMessage = new Message({ fullName, email, subject, message });
        await newMessage.save();

        res.status(201).json({ message: 'Message saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

export default router;
