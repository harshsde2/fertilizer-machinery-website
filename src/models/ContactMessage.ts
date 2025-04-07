import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for a contact message document
export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// Define the schema for the contact message
const ContactMessageSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: { 
    type: String 
  },
  company: { 
    type: String 
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'] 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create and export the model
export default mongoose.models.ContactMessage || 
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema); 