import express from 'express';
import Message from '../models/messagesModels.js';
import { sendNotificationEmail } from '../utils/emailService.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;

        // Input validation
        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        console.log('Received message data:', { fullName, email, subject, message });

        const newMessage = new Message({ fullName, email, subject, message });
        await newMessage.save();

        try {
            await sendNotificationEmail({ fullName, email, subject, message });
        } catch (err) {
            console.error('Error while sending email notification:', err.message);
        }
        console.log(req.body);
        res.status(201).json({ message: 'Message saved successfully' });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ error: 'Failed to save message: ' + err.message });
    }
});

export default router;
