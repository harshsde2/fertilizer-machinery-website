import { NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/validation';
import { connectToDatabase } from '@/lib/db';
import ContactMessage from '@/models/ContactMessage';
import { sendEmail, createContactFormEmail, createAutoResponseEmail } from '@/lib/email';

// Simple function to send a WhatsApp message (for reference - this would be client-side)
const exampleWhatsAppLink = (message: string, phoneNumber: string) => {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const body = await request.json();
    
    // Validate the form data
    const validation = validateContactForm(body);
    if (!validation.valid) {
      // Return validation errors
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          errors: validation.errors 
        },
        { status: 400 }
      );
    }
    
    try {
      // Connect to MongoDB
      await connectToDatabase();
      
      // Create a new contact message document
      const contactMessage = new ContactMessage({
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        company: body.company || '',
        message: body.message,
        isRead: false
      });
      
      // Save to database
      await contactMessage.save();
      
      // Send email notification
      const emailRecipient = process.env.EMAIL_TO || 'your-notification-email@example.com';
      const { subject, text, html } = createContactFormEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        message: body.message
      });

      const emailResult = await sendEmail({
        to: emailRecipient,
        subject,
        text,
        html
      });

      if (!emailResult.success) {
        console.error('Failed to send email notification:', emailResult.error);
        // Continue with the process even if email fails
        // You might want to log this to your monitoring system
      }
      
      // Send auto-response to customer
      const autoResponse = createAutoResponseEmail(body.name, body.email);
      await sendEmail(autoResponse);
      
      // Return success response
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for your message! We will get back to you soon.'
        },
        { status: 200 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Return database error
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to save your message. Please try again later.'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in contact API route:', error);
    
    // Return generic error
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
} 