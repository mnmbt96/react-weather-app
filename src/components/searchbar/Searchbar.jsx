import React from "react";
import { useState } from "react";
import { GrLocation } from "react-icons/gr";
import "./searchbar.css";

const Searchbar = ({ setQuery }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = (e) => {
    if (city !== "") setQuery({ q: city });
    e.target.value = " ";
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="search-container">
      <input
        className="seachbar"
        type="text"
        placeholder="🔍 Search for a city name"
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
        onKeyDown={handleSearchClick}
      />
      <GrLocation className="current-location" onClick={handleLocationClick} />
    </div>
  );
};

export default Searchbar;
