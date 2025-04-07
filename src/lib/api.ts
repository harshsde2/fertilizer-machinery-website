/**
 * Types for contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

/**
 * Types for API responses
 */
export interface ApiSuccessResponse {
  success: true;
  message: string;
}

export interface ApiErrorResponse {
  success?: false;
  error: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

/**
 * Submits the contact form data to the API
 */
export async function submitContactForm(formData: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to submit the form. Please try again later.',
      };
    }
    
    return data as ApiSuccessResponse;
  } catch (error) {
    console.error('API error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
} 