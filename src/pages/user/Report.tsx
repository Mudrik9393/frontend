import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD_Zop-kR0XIm6lRh1DSuOnvNBv79ix7qY",
  });

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

  if (!isLoaded) return <div>Loading map...</div>;

  const center = locations.length > 0
    ? { lat: locations[0].latitude, lng: locations[0].longitude }
    : defaultCenter;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Complaint Locations Map</h2>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={loc.complaintName}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Report;
