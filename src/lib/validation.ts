/**
 * Validation result type
 */
export type ValidationResult = {
  valid: boolean;
  message?: string;
};

/**
 * Validates an email address
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = emailRegex.test(email);
  
  return {
    valid,
    message: valid ? undefined : 'Please enter a valid email address',
  };
}

/**
 * Validates that a field is not empty
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  const valid = value.trim().length > 0;
  
  return {
    valid,
    message: valid ? undefined : `${fieldName} is required`,
  };
}

/**
 * Validates a phone number (optional field)
 */
export function validatePhone(phone: string): ValidationResult {
  // If empty, it's valid (since phone is optional)
  if (!phone.trim()) {
    return { valid: true };
  }
  
  // Simple validation - adjust based on your requirements
  const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
  const valid = phoneRegex.test(phone);
  
  return {
    valid,
    message: valid ? undefined : 'Please enter a valid phone number',
  };
}

/**
 * Validates the entire contact form
 */
export function validateContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  // Validate required fields
  const nameValidation = validateRequired(formData.name, 'Name');
  if (!nameValidation.valid && nameValidation.message) {
    errors.name = nameValidation.message;
  }
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid && emailValidation.message) {
    errors.email = emailValidation.message;
  }
  
  const messageValidation = validateRequired(formData.message, 'Message');
  if (!messageValidation.valid && messageValidation.message) {
    errors.message = messageValidation.message;
  }
  
  // Validate optional fields if provided
  if (formData.phone) {
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.valid && phoneValidation.message) {
      errors.phone = phoneValidation.message;
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
} 