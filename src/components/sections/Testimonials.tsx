"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "John Smith",
    position: "Production Manager",
    company: "MegaFarm Industries",
    image: "/testimonial1.svg", // We'll replace with actual images later
    quote: "The Rotary Drum Granulator has increased our production efficiency by 40%. The quality of granules is consistently excellent.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Operations Director",
    company: "GreenGrow Fertilizers",
    image: "/testimonial2.svg",
    quote: "Their NPK Blending System is a game-changer. The precision in mixing and the automated controls have revolutionized our process.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Technical Lead",
    company: "AgriTech Solutions",
    image: "/testimonial3.svg",
    quote: "Outstanding customer support and machine reliability. We've been using their equipment for over 5 years with minimal maintenance.",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    position: "Plant Supervisor",
    company: "FertilMax Corp",
    image: "/testimonial4.svg",
    quote: "The coating machine's performance exceeds expectations. Product quality has improved significantly since installation.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            Client <span className="text-green-600">Testimonials</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-green-500 mx-auto mb-8"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600"
          >
            Hear what our clients have to say about their experience with our machinery
            and service.
          </motion.p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              {/* Client Image */}
              <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0">
                <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={`${testimonials[currentIndex].name} - ${testimonials[currentIndex].position}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Rating Stars */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-700 italic mb-2">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>
                <div>
                  <cite className="not-italic">
                    <span className="font-bold text-gray-900 block mb-1">
                      {testimonials[currentIndex].name}
                    </span>
                    <span className="text-green-600 block mb-1">
                      {testimonials[currentIndex].position}
                    </span>
                    <span className="text-gray-500">
                      {testimonials[currentIndex].company}
                    </span>
                  </cite>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-center md:justify-end gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-green-600 w-4" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 