"use client";

import React from 'react';

interface MapProps {
  address?: string;
  height?: string;
  className?: string;
  zoom?: number;
}

const Map = ({ 
  address = "123 Industrial Zone, Fertilizer City, FC 12345", 
  height = "400px",
  className = "",
  zoom = 14
}: MapProps) => {
  // Encode the address for use in URL
  const encodedAddress = encodeURIComponent(address);
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-md ${className}`} style={{ height }}>
      <iframe
        title="Location Map"
        src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default Map; 