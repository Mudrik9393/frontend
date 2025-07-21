import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";

// Define a common location type
type MapLocation = {
  latitude: number;
  longitude: number;
  name: string;
  source: "complaint" | "request";
};

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: -6.1659,
  lng: 39.2026,
};

const Report = () => {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD_Zop-kR0XIm6lRh1DSuOnvNBv79ix7qY", // Replace with your actual key if needed
  });

  // Fetch complaints and requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsRes, requestsRes] = await Promise.all([
          axios.get("http://localhost:5555/api/complaints/locations"),
          axios.get("http://localhost:5555/api/requests/locations"),
        ]);

        const complaintLocations: MapLocation[] = complaintsRes.data.map((c: any) => ({
          latitude: c.latitude,
          longitude: c.longitude,
          name: c.complaintName,
          source: "complaint",
        }));

        const requestLocations: MapLocation[] = requestsRes.data.map((r: any) => ({
          latitude: r.latitude,
          longitude: r.longitude,
          name: r.requestName,
          source: "request",
        }));

        setLocations([...complaintLocations, ...requestLocations]);
      } catch (err) {
        console.error("Error fetching map data:", err);
      }
    };

    fetchData();
  }, []);

  // Fit map bounds to all markers
  useEffect(() => {
    if (mapRef.current && locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((loc) => {
        bounds.extend({ lat: loc.latitude, lng: loc.longitude });
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [locations]);

  // Handle map load
  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Complaint & Request Locations Map</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        onLoad={onLoad}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={`${loc.source === "complaint" ? "Complaint" : "Request"}: ${loc.name}`}
            label={loc.source === "complaint" ? "C" : "R"}
            icon={{
              url:
                loc.source === "complaint"
                  ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Report;
