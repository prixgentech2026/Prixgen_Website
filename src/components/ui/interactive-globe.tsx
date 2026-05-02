'use client';

import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion } from "framer-motion";

// Standard lightweight TopoJSON for world map
const geoUrl = "/world-110m.json";
// Officially compliant India GeoJSON
const indiaGeoUrl = "/india-osm.geojson";

const locations = [
  { name: "India (HQ)", coordinates: [76.6394, 12.2958], offset: -15 }, // [longitude, latitude]
  { name: "Dubai", coordinates: [55.2708, 25.2048], offset: -15 },
  { name: "Hong Kong", coordinates: [114.1694, 22.3193], offset: 15 },
  { name: "Philippines", coordinates: [120.9842, 14.5995], offset: 15 },
  { name: "Australia", coordinates: [151.2093, -33.8688], offset: 15 }
];

// Memoized Map Background to prevent re-renders on scroll/parent updates
const MapBackground = React.memo(() => (
  <>
    {/* Subtle Sphere Background for better "Globe" visibility on white */}
    <circle cx="400" cy="200" r="180" fill="#f8fafc" className="opacity-50" />
    
    {/* Base World Map */}
    <Geographies geography={geoUrl}>
      {({ geographies }: { geographies: any[] }) =>
        geographies
          .filter((geo) => geo.id !== "356") // Filter out the default low-detail India
          .map((geo: any) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#E2E8F0" // slate-200 for better contrast
              stroke="#CBD5E1" // slate-300 for visible borders
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover: { fill: "#CBD5E1", outline: "none" }, // slate-300
                pressed: { outline: "none" },
              }}
            />
          ))
      }
    </Geographies>

    {/* Detailed Official India Overlay */}
    <Geographies geography={indiaGeoUrl}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo: any) => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill="#94A3B8" // slate-400 - Significantly darker to highlight India's presence
            stroke="#64748B" // slate-500
            strokeWidth={0.8}
            style={{
              default: { outline: "none" },
              hover: { fill: "#64748B", outline: "none" },
              pressed: { outline: "none" },
            }}
          />
        ))
      }
    </Geographies>
  </>
));

MapBackground.displayName = 'MapBackground';

export default function InteractiveGlobe() {
  return (
    <div className="w-full aspect-video md:aspect-square flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl transition-all duration-700 ease-in-out group relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 160, // Increased scale for better visibility
            center: [75, 18] // Adjusted center slightly
          }}
          className="w-full h-auto filter drop-shadow-[0_20px_50px_rgba(0,75,135,0.1)] group-hover:drop-shadow-[0_25px_60px_rgba(0,75,135,0.2)] transition-all duration-500"
        >
          <MapBackground />

          {/* Strategic Locations */}
          {locations.map(({ name, coordinates, offset }) => (
            <Marker key={name} coordinates={coordinates as [number, number]}>
              {/* Animated Halo */}
              <motion.circle
                r={12}
                fill="#00A3E0"
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ 
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.8, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Strategic Node */}
              <circle 
                r={5} 
                fill="#004B87" // prixgen-blue
                stroke="#fff" 
                strokeWidth={2} 
                className="drop-shadow-lg"
              />
              {/* City Label */}
              <text
                textAnchor="middle"
                y={offset}
                style={{ 
                  fontFamily: "Inter, sans-serif", 
                  fontSize: "12px", 
                  fontWeight: 800,
                  fill: "#1A1A1A",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  pointerEvents: "none"
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
}