import nodemailer from 'nodemailer';

export type EmailData = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: EmailData) {
  // Create a transporter - this example uses Gmail
  // For production, consider using a dedicated email service like SendGrid, Mailgun, etc.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'your-app-password' // Use an app password for Gmail
    }
  });

  try {
    // Send the email
    const info = await transporter.sendMail({
      from: `"Fertilizer Machinery" <${process.env.EMAIL_FROM || 'your-email@gmail.com'}>`,
      to,
      subject,
      text,
      html
    });

    console.log('Email sent: ', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error };
  }
}

export function createContactFormEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) {
  // Create the email subject
  const subject = `New Contact Form Submission from ${formData.name}`;
  
  // Create the plain text version
  const text = `
    New Contact Form Submission
    
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone || 'Not provided'}
    Company: ${formData.company || 'Not provided'}
    
    Message:
    ${formData.message}
  `;
  
  // Create the HTML version
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
    <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
    <h3>Message:</h3>
    <p>${formData.message.replace(/\n/g, '<br>')}</p>
  `;
  
  return { subject, text, html };
}

export function createAutoResponseEmail(customerName: string, customerEmail: string) {
  const subject = 'Thank you for contacting FertilMachines';
  
  const text = `
    Dear ${customerName},
    
    Thank you for contacting FertilMachines. We have received your inquiry and our team will get back to you as soon as possible.
    
    For urgent matters, please contact us directly via WhatsApp or phone.
    
    Best regards,
    The FertilMachines Team
  `;
  
  const html = `
    <h2>Thank you for contacting FertilMachines</h2>
    <p>Dear ${customerName},</p>
    <p>Thank you for contacting FertilMachines. We have received your inquiry and our team will get back to you as soon as possible.</p>
    <p>For urgent matters, please contact us directly via WhatsApp or phone.</p>
    <p>Best regards,<br>The FertilMachines Team</p>
  `;
  
  return { subject, text, html, to: customerEmail };
} 