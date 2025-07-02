import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";

type Location = {
  latitude: number;
  longitude: number;
  complaintName: string;
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
  const [locations, setLocations] = useState<Location[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD_Zop-kR0XIm6lRh1DSuOnvNBv79ix7qY", // Replace if needed
  });

  // Fetch locations from backend
  useEffect(() => {
    axios
      .get("http://localhost:5555/api/complaints/locations")
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
      });
  }, []);

  // Fit map bounds to show all markers
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
      <h2 className="text-xl font-semibold mb-4">Complaint Locations Map</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        onLoad={onLoad}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={loc.complaintName}
            label={`${index + 1}`} // Optional: adds marker number
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Report;
