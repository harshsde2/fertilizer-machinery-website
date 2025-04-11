"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import marker icons correctly
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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
    // Setup custom icon instead of modifying default
    const customIcon = new L.Icon({
      iconUrl: markerIcon.src,
      iconRetinaUrl: markerIcon2x.src,
      shadowUrl: markerShadow.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    // Make it globally available for our component
    // @ts-ignore - adding a custom property
    L.customIcon = customIcon;
    
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div 
      className={`bg-gray-100 animate-pulse ${className}`} 
      style={{ height }}
    />;
  }

  return (
    <div className={`h-full w-full ${className}`}>
      <MapContainer 
        center={center}
        zoom={zoom} 
        style={{ height, width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={center} 
          // @ts-ignore - custom icon property
          icon={L.customIcon}
        >
          <Popup>
            {markerTitle}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ClientSideMap; 