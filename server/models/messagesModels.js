import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    fullName: { type: String, required: true }, 
    email: { type: String, required: true },    
    subject: { type: String, required: true },  
    message: { type: String, required: true }, 
}, { timestamps: true }); 

export default mongoose.model('Message', messageSchema);
