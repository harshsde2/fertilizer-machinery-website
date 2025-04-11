declare module '@/lib/email' {
  export interface EmailData {
    to: string;
    subject: string;
    text: string;
    html: string;
  }

  export function sendEmail(data: EmailData): Promise<{ success: boolean; message?: string; error?: string }>;
  
  export function createContactFormEmail(data: Record<string, string>): EmailData;
  
  export function createAutoResponseEmail(data: Record<string, string>): EmailData;
} 