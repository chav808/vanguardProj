import Header from "./Header";


import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const Spots = ({ initialPosition }) => {
  const [location, setLocation] = useState(initialPosition || null);
  const [zoom, setZoom] = useState(13);
  const [restaurants, setRestaurants] = useState([]);
  const [priceFilter, setPriceFilter] = useState(null); // added this state variable


  // Hardcoded restaurant data
  const restaurantData = [
    {
      name: "Tacos El Machine Gon",
      price: "$",
      stars: 4.6,
      lat: 25.94846364260936,
      lng: -80.1492193105518,
    },
    {
      name: "Pizza Blanco",
      price: "$",
      stars: 4.8,
      lat: 25.95567019065089,
      lng: -80.12038403327554,
    },
    {
      name: "Katana Japanese Restaurant",
      price: "$",
      stars: 4.5,
      lat: 25.856734433051002,
      lng: -80.12919182531836,
    },
    {
      name: "Ha Temania",
      price: "$",
      stars: 4.6,
      lat: 25.954169981225707,
      lng: -80.14856204238063,
    },
    {
      name: "El Desembarco Collins",
      price: "$",
      stars: 4.9,
      lat: 25.86059960983754,
      lng: -80.11989561169969,
    },
    {
      name: "Flaningan’s Seafood Bar and Grill",
      price: "$$",
      stars: 4.5,
      lat: 25.88770613447536,
      lng: -80.12367216166075,
    },
    {
      name: "Pura Vida",
      price: "$$",
      stars: 4.5,
      lat: 25.888429927419708,
      lng: -80.12982834123274,
    },
    {
      name: "Sushi Republic",
      price: "$$",
      stars: 4.5,
      lat: 25.888275492856327,
      lng: -80.12330520948193,
    },
    {
      name: "Emilio’s Trattoria",
      price: "$$",
      stars: 4.6,
      lat: 25.887734970293508,
      lng: -80.13163078553237,
    },
    {
      name: "Ceviche Inka Miami",
      price: "$$",
      stars: 4.6,
      lat: 25.928238718442643,
      lng: -80.1387590878281,
    },
    {
      name: "Ristorante Portovino",
      price: "$$",
      stars: 4.5,
      lat: 25.93148070319068,
      lng: -80.13575501399548,
    },
    {
      name: "Black Caviar Restaurant",
      price: "$$$",
      stars: 4.7,
      lat: 25.93546219536996,
      lng: -80.12335077987089,
    },
    {
      name: "26 Sushi & Tapas",
      price: "$$$",
      stars: 4.5,
      lat: 25.88705369821271,
      lng: -80.1233208878281,
    },
    // ...other restaurant objects (omitted for brevity)
  ];

  useEffect(() => {
    if (!location) {
      _getPosition((lat, lng) => {
        if (lat && lng) {
          setLocation({ lat, lng });
        } else {
          alert("Failed to get coordinates. Using default coordinates.");
          setLocation({ lat: 0, lng: 0 });
        }
      });
    }

    // Set hardcoded restaurant data
    setRestaurants(restaurantData);
  }, []);

  const customIcon = new Icon({
    iconUrl: require("../assets/marker.png"), // make sure this path is correct
    iconSize: [25, 25],
  });

  const _getPosition = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          callback(position.coords.latitude, position.coords.longitude);
        },
        () => {
          alert("Cannot get your position");
          callback(null, null);
        }
      );
    }
  };
  const filteredRestaurants = priceFilter
  ? restaurants.filter((restaurant) => restaurant.price === priceFilter)
  : restaurants;


  return (
    <div>
    <h1>My Map App</h1>
    {/* Dropdown to select price filter */}
    <select
      value={priceFilter || ""}
      onChange={(e) => setPriceFilter(e.target.value)}
    >
      <option value="">All Prices</option>
      <option value="$">$</option>
      <option value="$$">$$</option>
      <option value="$$$">$$$</option>
    </select>

	<Button
        component={RouterLink}
        to="/map" // Navigate to the "/map" route
        variant="contained"
        fullWidth
        style={{ marginTop: "2rem" }}
      >
        Go to Map
      </Button>
	  
    {location && location.lat !== undefined && location.lng !== undefined ? (
      <MapContainer center={location} zoom={zoom} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location} icon={customIcon}>
          <Popup>You are here.</Popup>
        </Marker>
        {filteredRestaurants.map((restaurant, index) => (
          <Marker key={index} position={{ lat: restaurant.lat, lng: restaurant.lng }} icon={customIcon}>
            <Popup>{restaurant.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    ) : (
      <p>Loading map...</p>
    )}
  </div>
  );
};


export default Spots;
