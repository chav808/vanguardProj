import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {Icon} from "leaflet";

const MyMap = ({ initialPosition }) => {
  const [location, setLocation] = useState(initialPosition || null);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (!location) {
      // If initialPosition is not provided, use geolocation to get the position
      _getPosition((lat, lng) => {
        setLocation({
          lat,
          lng,
        });
      });
    }
  }, [location]);

  const customIcon = new Icon ({
    iconUrl:require("../assets/marker.png"),
    iconSize:[38,38]
  })

  const _getPosition = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          callback(position.coords.latitude, position.coords.longitude);
        },
        () => {
          alert("Cannot get your position");
        }
      );
    }
  };
 
  return (
    <div>
      <h1>My Map App</h1>
      {location ? (
        <MapContainer center={location} zoom={zoom} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location} icon={customIcon}>
            <Popup>You are here.</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MyMap;