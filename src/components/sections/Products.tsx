"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "../ui/Button";

// Sample products - we'll replace with real data later
const products = [
  {
    id: 1,
    name: "Rotary Drum Granulator",
    description: "High-efficiency granulation for compound fertilizer production",
    features: ["Capacity: 5-10 tons/hour", "Low energy consumption", "Uniform granules"],
    image: "/placeholder.jpg", // We'll replace with actual images later
  },
  {
    id: 2,
    name: "NPK Blending System",
    description: "Precise blending technology for customized fertilizer formulations",
    features: ["Multiple formula storage", "High precision weighing", "Automated control"],
    image: "/placeholder.jpg",
  },
  {
    id: 3,
    name: "Coating Machine",
    description: "Advanced coating solution for controlled-release fertilizers",
    features: ["Even coating distribution", "Temperature control", "Anti-caking treatment"],
    image: "/placeholder.jpg",
  },
  {
    id: 4,
    name: "Fertilizer Crusher",
    description: "Powerful crushing equipment for raw material preparation",
    features: ["Adjustable granule size", "High throughput", "Low maintenance"],
    image: "/placeholder.jpg",
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
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            Our <span className="text-green-600">Products</span>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
            >
              <div className="relative bg-gray-200 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                  {product.name} Image
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
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
                <Button>View Details</Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
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
            Request Product Catalog
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Products; 