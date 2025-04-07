declare module '@/lib/email' {
  export type EmailData = {
    to: string;
    subject: string;
    text: string;
    html: string;
  };

  export function sendEmail(data: EmailData): Promise<{ success: boolean; messageId?: string; error?: any }>;
  
  export function createContactFormEmail(formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
  }): { subject: string; text: string; html: string };
  
  export function createAutoResponseEmail(
    customerName: string, 
    customerEmail: string
  ): { subject: string; text: string; html: string; to: string };
} 