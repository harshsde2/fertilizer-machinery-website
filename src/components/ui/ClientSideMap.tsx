"use client";

import React, { useEffect, useState } from 'react';

// Interface for our map props
interface ClientSideMapProps {
  center: [number, number];
  zoom: number;
  height: string;
  className?: string;
  markerTitle: string;
}

const ClientSideMap = ({ 
  center,
  zoom,
  height,
  className = "",
  markerTitle
}: ClientSideMapProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Only import Leaflet on the client side
    require('leaflet/dist/leaflet.css');
    const L = require('leaflet');
    
    // Fix for default marker icons not showing correctly
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconUrl: '/marker-icon.png',
      iconRetinaUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    });
    
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div 
      className={`bg-gray-100 animate-pulse ${className}`} 
      style={{ height }}
    />;
  }

  // Dynamically require react-leaflet components after mounting
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');

  return (
    <div className={`h-full w-full ${className}`}>
      <MapContainer 
        center={center}
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            {markerTitle}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ClientSideMap; 