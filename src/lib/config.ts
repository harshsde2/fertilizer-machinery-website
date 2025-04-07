/**
 * Global site configuration
 * This file contains site-wide variables that can be easily updated
 */

// Company information
export const COMPANY_NAME = 'Sarthak Enterprise';
export const COMPANY_FOUNDED_YEAR = 2005;
export const COMPANY_DESCRIPTION = 'Advanced Fertilizer Machinery Solutions';
export const COMPANY_LEGAL_NAME = 'Sarthak Enterprise';

// Contact information
export const CONTACT_INFO = {
  email: 'info@sarthakenterprise.com',
  phone: '+1 (234) 567-890',
  whatsapp: '8266815617',
  address: {
    street: '123 Industrial Zone',
    city: 'Fertilizer City',
    state: 'FC',
    zip: '12345',
    country: 'India',
    full: '123 Industrial Zone, Fertilizer City, FC 12345'
  }
};

// Social media links
export const SOCIAL_MEDIA = {
  facebook: '#',
  instagram: '#',
  linkedin: '#',
  youtube: '#',
  twitter: '#'
};

// Site metadata
export const SITE_METADATA = {
  title: `${COMPANY_NAME} - ${COMPANY_DESCRIPTION}`,
  description: 'High-efficiency machinery for fertilizer production. Increase your productivity with our state-of-the-art technology.',
  keywords: 'fertilizer machinery, fertilizer equipment, granulator, NPK blending, coating machine, fertilizer crusher',
  url: 'https://sarthakenterprise.com',
  locale: 'en_US',
};

// Theme colors
export const THEME_COLORS = {
  primary: '#059669', // green-600
  secondary: '#10B981', // green-500  
  accent: '#047857', // green-700
  light: '#f9fafb', // gray-50
  dark: '#111827', // gray-900
};

// Video gallery information
export const VIDEO_INFO = {
  title: 'Video',
  description: 'Watch our machines in action and discover how they\'re transforming fertilizer production worldwide.',
  categories: [
    { id: "all", name: "All Videos" },
    { id: "product", name: "Product Demos" },
    { id: "facility", name: "Facility Tours" },
    { id: "testimonial", name: "Client Stories" },
  ]
}; 