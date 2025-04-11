"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Map from "../ui/Map";
import { submitContactForm } from "@/lib/api";
import { validateContactForm } from "@/lib/validation";
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_INFO } from "@/lib/config";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }
    
    // Clear errors
    setFormErrors({});
    
    // Set submitting state
    setIsSubmitting(true);
    
    try {
      // Submit form to API
      const response = await submitContactForm(formData);
      
      if (response.success) {
        // Form submitted successfully
        setFormStatus({
          submitted: true,
          success: true,
          message: response.message,
        });
        
        // Directly send to WhatsApp after successful submission
        sendFormDataToWhatsApp(formData);
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        // API returned an error
        setFormStatus({
          submitted: true,
          success: false,
          message: response.error,
        });
      }
    } catch (err) {
      console.error("Form submission error:", err);
      // Handle submission error
      setFormStatus({
        submitted: true,
        success: false,
        message: "Failed to submit the form. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update the handleWhatsAppContact function
  const handleWhatsAppContact = () => {
    // Default message template
    const message = encodeURIComponent(
      "Hello, I'd like to inquire about your fertilizer machinery products."
    );
    // Get number from environment variable or use fallback
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || CONTACT_INFO.whatsapp;
    // Open WhatsApp with prefilled message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Update the sendFormDataToWhatsApp function
  const sendFormDataToWhatsApp = (data: typeof formData) => {
    // Create a formatted message with all form data
    const message = encodeURIComponent(
      `Hello, I'm ${data.name}.\n\n` +
      `*My contact details:*\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || 'Not provided'}\n` +
      `Company: ${data.company || 'Not provided'}\n\n` +
      `*Inquiry:*\n${data.message}`
    );
    
    // Get WhatsApp number from config
    const phoneNumber = CONTACT_INFO.whatsapp;
    
    // Open WhatsApp with the form data in a new tab
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-12 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            Contact <span className="text-green-600">Us</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-green-500 mx-auto mb-8"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 mb-8"
          >
            Have a question about our fertilizer machinery or need a customized solution?
            Fill out the form below, and our team will get back to you shortly.
          </motion.p>

          {/* Direct WhatsApp Contact Button */}
          <motion.div variants={itemVariants} className="mb-8">
            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              <FaWhatsapp className="text-xl" />
              <span>Contact Us Directly on WhatsApp</span>
            </button>
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Contact Information */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="bg-green-600 text-white p-8 md:w-2/5"
              >
                <motion.h3
                  variants={itemVariants}
                  className="text-2xl font-bold mb-6"
                >
                  Contact Information
                </motion.h3>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="flex items-start mb-4">
                    <svg 
                      className="w-6 h-6 mr-3 mt-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-green-200">{CONTACT_INFO.address.full}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <svg 
                      className="w-6 h-6 mr-3 mt-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-green-200">{CONTACT_INFO.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg 
                      className="w-6 h-6 mr-3 mt-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-green-200">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-8 mb-8">
                  <h4 className="font-medium mb-4">Quick Connect</h4>
                  <button
                    onClick={handleWhatsAppContact}
                    className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-400 text-white py-3 px-4 rounded-lg transition-colors w-full"
                    aria-label="Contact via WhatsApp"
                  >
                    <FaWhatsapp className="text-xl" />
                    <span>Chat on WhatsApp</span>
                  </button>
                  <p className="text-green-200 text-sm mt-2 text-center">
                    Available during business hours
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-12">
                  <h4 className="font-medium mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-green-200 transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-green-200 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="p-8 md:w-3/5"
              >
                {formStatus.submitted && formStatus.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-100 text-green-700 p-6 rounded-lg"
                  >
                    <svg
                      className="w-10 h-10 mx-auto mb-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <h3 className="text-xl font-bold text-center mb-2">Message Sent!</h3>
                    <p className="text-center">{formStatus.message}</p>
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setFormStatus({ submitted: false, success: false, message: "" })}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Send another message
                      </button>
                    </div>
                  </motion.div>
                ) : formStatus.submitted && !formStatus.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-100 text-red-700 p-6 rounded-lg"
                  >
                    <svg
                      className="w-10 h-10 mx-auto mb-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-bold text-center mb-2">Error</h3>
                    <p className="text-center">{formStatus.message}</p>
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setFormStatus({ submitted: false, success: false, message: "" })}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Try again
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <motion.div variants={itemVariants}>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            formErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div variants={itemVariants} className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                      )}
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          // Validate form before sending to WhatsApp
                          const validation = validateContactForm(formData);
                          if (!validation.valid) {
                            setFormErrors(validation.errors);
                            return;
                          }
                          // If valid, send to WhatsApp
                          sendFormDataToWhatsApp(formData);
                        }}
                        className="w-full mt-4 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                        aria-label="Send via WhatsApp"
                        disabled={isSubmitting}
                      >
                        <FaWhatsapp className="text-xl" />
                        <span>{isSubmitting ? 'Processing...' : 'Send via WhatsApp'}</span>
                      </button>
                      <p className="text-sm text-center text-gray-500 mt-2">
                        For faster response, send your message directly via WhatsApp
                      </p>
                    </motion.div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <h3 className="text-xl font-bold p-6 border-b border-gray-100">Our Location</h3>
            <Map 
              address={CONTACT_INFO.address.full}
              height="400px" 
              zoom={14}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 