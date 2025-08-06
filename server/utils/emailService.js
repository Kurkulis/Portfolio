import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendNotificationEmail = async ({ fullName, email, subject, message }) => {
    const mailOptions = {
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `Naujas pranešimas: ${subject}`,
        text: `
        Gavote naują pranešimą:

        Vardas: ${fullName}
        El. paštas: ${email}
        Tema: ${subject}
        Žinutė: ${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully.');
    } catch (err) {
        console.error('Detailed email error:', {
            message: err.message,
            code: err.code,
            command: err.command
        });
        throw err;
    }
};
