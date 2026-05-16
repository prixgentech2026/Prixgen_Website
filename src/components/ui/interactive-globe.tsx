'use client';

import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

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
                default: { outline: "none", pointerEvents: "none" },
                hover: { outline: "none", pointerEvents: "none" },
                pressed: { outline: "none", pointerEvents: "none" },
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
              default: { outline: "none", pointerEvents: "none" },
              hover: { outline: "none", pointerEvents: "none" },
              pressed: { outline: "none", pointerEvents: "none" },
            }}
          />
        ))
      }
    </Geographies>
  </>
));

MapBackground.displayName = 'MapBackground';

export default function InteractiveGlobe() {
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px' } // Load ONLY when actually in view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center p-0 overflow-hidden group"
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform',
        contentVisibility: 'auto',
      }}
    >
      <style jsx global>{`
        @keyframes globe-pulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.8); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        .globe-marker-pulse {
          transform-origin: center;
          transform-box: fill-box;
          animation: globe-pulse 3s ease-in-out infinite;
        }
      `}</style>

      {!isVisible ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-prixgen-blue/20 border-t-prixgen-blue rounded-full animate-spin" />
        </div>
      ) : (
        <div className="w-full h-full transition-all duration-700 ease-in-out relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 180, 
              center: [75, 10] 
            }}
            className="w-full h-full transition-all duration-500"
          >
            <MapBackground />

            {/* Strategic Locations */}
            {locations.map(({ name, coordinates, offset }) => (
              <Marker key={name} coordinates={coordinates as [number, number]}>
                {/* CSS-Animated Halo (More performant than Framer Motion for loops) */}
                <circle
                  cx={0}
                  cy={0}
                  r={12}
                  fill="#00A3E0"
                  className="globe-marker-pulse"
                />
                
                {/* Strategic Node */}
                <circle 
                  cx={0}
                  cy={0}
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
      )}
    </div>
  );
}