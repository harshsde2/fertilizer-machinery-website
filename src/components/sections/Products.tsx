"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "../ui/Button";
import Image from "next/image";
import { COMPANY_NAME } from "@/lib/config";

// Import images from assets
import rotaryDrumImage from '@/assets/images/Fertilizer-Drum-Granulator.jpg';
import npkBlendingImage from '@/assets/images/Bulk-Blending-Fertilizer-Mixer-Machine.jpg';
import coatingMachineImage from '@/assets/images/coating-machine.png';
import crusherImage from '@/assets/images/Fertilizer-Chain-Crusher.jpg';

// Sample products data
const products = [
  {
    id: 1,
    name: "Rotary Drum Granulator",
    model: "RDG-1000",
    status: "Best Seller",
    description: "High-efficiency granulation for compound fertilizer production",
    features: ["Capacity: 5-10 tons/hour", "Low energy consumption", "Uniform granules"],
    image: rotaryDrumImage,
  },
  {
    id: 2,
    name: "NPK Blending System",
    model: "NPK-500",
    status: "New Model",
    description: "Precise blending technology for customized fertilizer formulations",
    features: ["Multiple formula storage", "High precision weighing", "Automated control"],
    image: npkBlendingImage,
  },
  {
    id: 3,
    name: "Coating Machine",
    model: "CM-2000",
    status: "Featured",
    description: "Advanced coating solution for controlled-release fertilizers",
    features: ["Even coating distribution", "Temperature control", "Anti-caking treatment"],
    image: coatingMachineImage,
  },
  {
    id: 4,
    name: "Fertilizer Crusher",
    model: "FC-750",
    status: "Popular",
    description: "Powerful crushing equipment for raw material preparation",
    features: ["Adjustable granule size", "High throughput", "Low maintenance"],
    image: crusherImage,
  },
];

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="products" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="text-green-600 font-semibold inline-block mb-2"
          >
            ADVANCED EQUIPMENT
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            {COMPANY_NAME} <span className="text-green-600">Products</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-green-500 mx-auto mb-8"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600"
          >
            We offer a comprehensive range of machinery for fertilizer
            manufacturing, from raw material processing to packaging solutions.
            Our equipment is designed for maximum efficiency and durability.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative aspect-[16/9] bg-gray-50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:scale-105 transition-transform duration-500"
                  priority={product.id <= 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-2 left-4 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  {product.status}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Model: {product.model}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 mr-3 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col space-y-4">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {}}
                  >
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Details
                    </span>
                  </Button>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Request Quote
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Download Complete Product Catalog
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Products; 